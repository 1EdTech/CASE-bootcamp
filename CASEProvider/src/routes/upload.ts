import { Router } from "express";
import prisma from "../lib/prisma";
import fs from "fs";
import { randomUUID } from "crypto";
import { parse } from "csv-parse/sync";
import { BASE_PATH, CASE_VERSION, HOST } from "./constants";
import { CFItem } from "@prisma/client";
import { create } from "domain";

const router = Router();

// CSV upload endpoint for documents
router.post("/upload", async (req, res) => {
  const { filePath } = req.body ?? {};

  if (typeof filePath !== "string" || !filePath.trim()) {
    return res
      .status(400)
      .json({ error: 'Request body must include a string field "filePath"' });
  }

  try {
    const csvContent = await fs.promises.readFile(filePath, "utf-8");
    const rows = parse(csvContent, {
      columns: true,
      from_line: 5, // skip first 4 lines (Description, etc.)
      skip_empty_lines: true,
      trim: true,
    });

    if (!rows.length) {
      return res.status(400).json({ error: "CSV is empty or unreadable" });
    }

    const frameworksData = rows.map((row: { [x: string]: any }) => {
      const identifier = randomUUID();
      const lastChangeDateTime = new Date();
      return {
        identifier,
        lastChangeDateTime,
        document: {
          create: {
            identifier: identifier,
            uri: `${HOST}${BASE_PATH}/CfDocuments/${identifier}`,
            frameworkType: "Bootcamp Framework",
            caseVersion: CASE_VERSION,
            creator: row["Creator"] || "Unknown",
            title: row["Title"] || null,
            lastChangeDateTime,
            officialSourceURL: row["Official Source URL"] || null,
            publisher: row["Publisher (CASE Provider software name)"] || null,
            description: null,

            subject: row["Overall Subject"]
              ? row["Overall Subject"]
                  .split("|")
                  .map((v: string) => v.trim())
                  .filter(Boolean)
              : [],
            language: row["Language (Eng, Span, Korean, etc.)"] || null,
            version: row["Framework Document Version"] || null,
            adoptionStatus: row["Adoption Status"] || null,
            statusStartDate: null,
            statusEndDate: null,
            notes: null,
            packageUri: {
              create: {
                uri: `${HOST}${BASE_PATH}/CfPackages/${identifier}`,
                title: `Package for ${row["Title"] || "Untitled Framework"}`,
              },
            },
          },
        },
      };
    });

    // we use Promise.all because we're creating the inner document, not supported by createMany
    await Promise.all(
      frameworksData.map(async (pkg: any) =>
        prisma.cFPackage.create({ data: pkg }),
      ),
    );

    res.status(201).json({
      itemsCreated: frameworksData.length,
      items: frameworksData.map((data: any) => ({
        documentUri: data.document.create.uri,
        documentTitle: data.document.create.title,
        packageUri: data.document.create.packageUri.create.uri,
      })),
    });
  } catch (error) {
    console.error("[upload-csv] error:", error);
    res.status(500).json({
      error: "Failed to process CSV",
      details: (error as Error).message,
    });
  }
});

// CSV upload endpoint for items belonging to an existing framework
router.post("/items/upload", async (req, res) => {
  const { filePath } = req.body ?? {};

  if (typeof filePath !== "string" || !filePath.trim()) {
    return res
      .status(400)
      .json({ error: 'Request body must include a string field "filePath"' });
  }

  try {
    const csvContent = await fs.promises.readFile(filePath, "utf-8");
    const rows = parse(csvContent, {
      columns: true,
      from_line: 5, // keep consistency with the other upload format
      skip_empty_lines: true,
      trim: true,
    });

    if (!rows.length) {
      return res.status(400).json({ error: "CSV is empty or unreadable" });
    }

    console.log(`[items/upload] Parsed ${rows.length} rows from CSV.`);

    // group all rows by package identifier column, returning an array of [id, rows[]]
    const packagesMap = rows.reduce(
      (map: Map<string, any[]>, row: { [x: string]: any }) => {
        const packageId = row["Framework Identifier"];
        if (!packageId) return map;
        if (!map.has(packageId)) {
          map.set(packageId, []);
        }
        map.get(packageId)!.push(row);
        return map;
      },
      new Map<string, any[]>(),
    );

    console.log(
      `[items/upload] Found ${packagesMap.size} unique packages in CSV.`,
    );

    // traverse each package group and create items
    const itemsData = [];
    for (const [packageId, packageRows] of packagesMap.entries()) {
      console.log(
        `[items/upload] Processing package ${packageId} with ${packageRows.length} items...`,
      );
      // look up package by identifier
      const cfPackage = await prisma.cFPackage.findUnique({
        where: { identifier: packageId },
      });

      if (!cfPackage) {
        console.warn(
          `[items/upload] Package with identifier ${packageId} not found, skipping...`,
        );
        continue;
      }

      // As per https://www.imsglobal.org/spec/CASE/v1p1/impl#case-json-entity-types,
      // the identifier of the CFDocument is used as the identifier of the CFPackage.
      const documentId = cfPackage.identifier;

      // prepare item data
      const items = packageRows.map(
        (row: { [key: string]: any }, idx: number) => {
          const identifier = randomUUID();
          return {
            identifier,
            uri: `${HOST}${BASE_PATH}/CfItems/${identifier}`,
            fullStatement:
              row["Full Statement"] || "Identifier without statement",
            abbreviatedStatement: row["Abbreviated Statement"] || null,
            alternativeLabel: null,
            humanCodingScheme: row["Code"] || null,
            cfItemType: row["Type"] || null,
            notes: row["Notes"] || null,
            language: row["Language (Eng, Span, Korean, etc.)"] || null,
            cfDocumentIdentifier: documentId,
          };
        },
      );
      itemsData.push(...items);
    }

    const created = await prisma.cFItem.createMany({ data: itemsData });

    res.status(201).json({
      itemsCreated: created.count,
    });
  } catch (error) {
    console.error("[items/upload] error:", error);
    res.status(500).json({
      error: "Failed to process CSV",
      details: (error as Error).message,
    });
  }
});

router.post("/associations/upload", async (req, res) => {
  const { filePath } = req.body ?? {};

  if (typeof filePath !== "string" || !filePath.trim()) {
    return res
      .status(400)
      .json({ error: 'Request body must include a string field "filePath"' });
  }

  try {
    const csvContent = await fs.promises.readFile(filePath, "utf-8");
    const rows = parse(csvContent, {
      columns: true,
      from_line: 5, // skip first 4 lines (Description, etc.)
      skip_empty_lines: true,
      trim: true,
    });

    if (!rows.length) {
      return res.status(400).json({ error: "CSV is empty or unreadable" });
    }

    console.log(`[associations/upload] Parsed ${rows.length} rows from CSV.`);

    // get a map of all CFItems by their humanCodingScheme for quick lookup
    const humanCodes = rows
      .map((row: { [x: string]: any }) => [
        row["Origin Code"],
        row["Destination Code"],
      ])
      .flat();
    const cfItems = await prisma.cFItem.findMany({
      where: {
        humanCodingScheme: { in: humanCodes },
      },
    });
    const itemMap = new Map<string, CFItem>();
    cfItems.forEach((item) => {
      if (item.humanCodingScheme) {
        itemMap.set(item.humanCodingScheme, item);
      }
    });

    const createdAssociations = [];

    for (const row of rows) {
      const identifier = randomUUID();
      const lastChangeDateTime = new Date();

      // look up package by identifier
      const frameworkIdentifier = row["Framework Identifier"];
      const cfPackage = await prisma.cFPackage.findUnique({
        where: { identifier: frameworkIdentifier },
      });

      if (!cfPackage) {
        console.warn(
          `[items/upload] Package with identifier ${frameworkIdentifier} not found, skipping...`,
        );
        continue;
      }

      const origin = itemMap.get(row["Origin Code"]);
      const destination = itemMap.get(row["Destination Code"]);

      if (!origin || !destination) {
        throw new Error(
          `Origin or Destination item not found for codes: ${row["Origin Code"]}, ${row["Destination Code"]}`,
        );
      }

      const assocData = {
        identifier,
        associationType: row["Association Type"] || "unspecified",
        sequenceNumber: row["Sequence Number"]
          ? parseInt(row["Sequence Number"], 10)
          : null,
        uri: `${HOST}${BASE_PATH}/CfAssociations/${identifier}`,
        lastChangeDateTime,
        notes: row["Notes"] || null,
        originNode: {
          connectOrCreate: {
            where: {
              uri: origin.uri,
            },
            create: {
              identifier: randomUUID(),
              uri: origin.uri,
              title: `${origin.humanCodingScheme}: ${origin.abbreviatedStatement} || ${origin.fullStatement}`,
              targetType: "CASE",
            },
          },
        },
        destinationNode: {
          connectOrCreate: {
            where: {
              uri: destination.uri,
            },
            create: {
              identifier: randomUUID(),
              uri: destination.uri,
              title: `${destination.humanCodingScheme}: ${destination.abbreviatedStatement} || ${destination.fullStatement}`,
              targetType: "CASE",
            },
          },
        },
        cfDocument: {
          connect: {
            identifier: cfPackage.identifier,
          },
        }
      };
      const created = await prisma.cFAssociation.create({ data: assocData });
      createdAssociations.push(created);
    }

    res.status(201).json({
      itemsCreated: createdAssociations.length,
    });
  } catch (error) {
    console.error("[items/upload] error:", error);
    res.status(500).json({
      error: "Failed to process CSV",
      details: (error as Error).message,
    });
  }
});

export { router as uploadRouter };
