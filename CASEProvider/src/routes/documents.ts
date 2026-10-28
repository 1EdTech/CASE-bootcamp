import { Router } from "express";
import prisma from "../lib/prisma";
import { errors } from "../lib/errors";
import { validateSourcedId } from "../lib/validation";
import {
  buildPaginationHeaders,
  isPaginationError,
  parsePagination,
} from "../lib/pagination";
import { mapDocument, mapDocuments } from "../mappers/documents";
import { constructFilter } from "../lib/filter";

const router = Router();

/**
 * This is a request to the Service Provider to provide the information for the
 * specific Competency Framework Document. If the identified record cannot
 * be found then the 'unknownobject' status code must be reported.
 */
// GET /CFDocuments/{sourcedId}
router.get("/CFDocuments/:sourcedId", validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const document = await prisma.cFDocument.findUnique({
      where: { identifier: sourcedId },
      include: {
        subjects: true,
        cfLicense: true,
        cfPackage: true,
        packageUri: true,
      },
    });

    if (!document) {
      return errors.notFound(res);
    }

    res.json(mapDocument(document));
  } catch (error) {
    console.error("Error fetching document:", error);
    errors.internalError(res);
  }
});

/**
 * This is a request to the Service Provider to provide all of the Competency
 * Framework Documents.
 */
// GET /CFDocuments - List all documents
router.get("/CFDocuments", async (req, res) => {
  try {
    const { sort, orderBy = "asc", filter, fields } = req.query;

    const pagination = parsePagination(req.query);
    if (isPaginationError(pagination)) {
      errors.invalidQueryParameter(res, pagination.field);
      return;
    }

    const { limit, offset } = pagination;
    let query = {};

    console.log("Query parameters:", req.query);

    // filter.
    if (filter) {
      try {
        query = {
          ...query,
          ...constructFilter(filter as string),
        };
      } catch (error) {
        errors.invalidQueryParameter(res, "filter");
        return;
      }
    }

    console.log("Constructed query:", query);

    // sorting, default to identifier
    const orderByOptions: any = sort
      ? [{ [sort as string]: orderBy }]
      : [{ ["identifier"]: orderBy }];

    console.log("Order by options:", orderByOptions);

    // field selection. We should validate fields to avoid SQL injection and translate them to actual DB columns
    const select = (fields as string)
      ? (fields as string).split(",")
      : undefined;
    console.log("Select options:", select);

    const [documents, total] = await Promise.all([
      prisma.cFDocument.findMany({
        where: query,
        skip: offset,
        take: limit,
        orderBy: orderByOptions,
        include: {
          subjects: true,
          cfLicense: true,
          cfPackage: true,
          packageUri: true,
        },
      }),
      prisma.cFDocument.count({ where: query }),
    ]);

    res.setHeaders(buildPaginationHeaders(req, { limit, offset }, total));
    res.json(mapDocuments(documents, select));
  } catch (error) {
    console.error("Error fetching documents:", error);
    errors.internalError(res);
  }
});

export { router as documentsRouter };
