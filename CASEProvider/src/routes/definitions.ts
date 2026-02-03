import { Router } from "express";
import prisma from "../lib/prisma";
import { errors } from "../lib/errors";
import { validateSourcedId } from "../lib/validation";
import {
  mapAssociationGrouping,
  mapConcepts,
  mapItemTypes,
  mapLicense,
  mapSubjects,
} from "../mappers/definitions";

const router = Router();

// GET /CFAssociationGroupings/{sourcedId}
router.get(
  "/CFAssociationGroupings/:sourcedId",
  validateSourcedId,
  async (req, res) => {
    try {
      const { sourcedId } = req.params;

      const grouping = await prisma.cFAssociationGrouping.findUnique({
        where: { identifier: sourcedId },
      });

      if (!grouping) {
        return errors.notFound(res);
      }

      res.json(mapAssociationGrouping(grouping));
    } catch (error) {
      console.error("Error fetching association grouping:", error);
      errors.internalError(res);
    }
  },
);

// GET /CFConcepts/{sourcedId}
router.get("/CFConcepts/:sourcedId", validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const concept = await prisma.cFConcept.findUnique({
      where: { identifier: sourcedId },
    });

    if (!concept) {
      return errors.notFound(res);
    }

    // add all child concepts
    // 1. Get associations where associationType is "isChildOf" and destinationNode is concept.uri
    const childAssociations = await prisma.cFAssociation.findMany({
      where: {
        associationType: "isChildOf",
        destinationNode: {
          uri: concept.uri,
        },
      },
      include: {
        originNode: true,
      },
    });

    // 2. Find cfConcepts whose uri is in the originNode.uri of the associations
    const childCfConcepts = await prisma.cFConcept.findMany({
      where: {
        uri: {
          in: childAssociations.map((assoc) => assoc.originNode.uri),
        },
      },
    });

    const concepts = [concept, ...childCfConcepts];

    res.json(mapConcepts(concepts));
  } catch (error) {
    console.error("Error fetching concept:", error);
    errors.internalError(res);
  }
});

// GET /CFSubjects/{sourcedId}
router.get("/CFSubjects/:sourcedId", validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const subject = await prisma.cFSubject.findUnique({
      where: { identifier: sourcedId },
    });

    if (!subject) {
      return errors.notFound(res);
    }

    // add all child subjects
    // 1. Get associations where associationType is "isChildOf" and destinationNode is subject.uri
    const childAssociations = await prisma.cFAssociation.findMany({
      where: {
        associationType: "isChildOf",
        destinationNode: {
          uri: subject.uri,
        },
      },
      include: {
        originNode: true,
      },
    });

    // 2. Find cfSubjects whose uri is in the originNode.uri of the associations
    const childCfSubjects = await prisma.cFSubject.findMany({
      where: {
        uri: {
          in: childAssociations.map((assoc) => assoc.originNode.uri),
        },
      },
    });
    const subjects = [subject, ...childCfSubjects];

    res.json(mapSubjects(subjects));
  } catch (error) {
    console.error("Error fetching subject:", error);
    errors.internalError(res);
  }
});

// GET /CFLicenses/{sourcedId}
router.get("/CFLicenses/:sourcedId", validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const license = await prisma.cFLicense.findUnique({
      where: { identifier: sourcedId },
    });

    if (!license) {
      return errors.notFound(res);
    }

    res.json(mapLicense(license));
  } catch (error) {
    console.error("Error fetching license:", error);
    errors.internalError(res);
  }
});

// GET /CFItemTypes/{sourcedId}
router.get("/CFItemTypes/:sourcedId", validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const itemType = await prisma.cFItemType.findUnique({
      where: { identifier: sourcedId },
    });

    if (!itemType) {
      return errors.notFound(res);
    }

    // add all child item types
    // 1. Get associations where associationType is "isChildOf" and destinationNode is itemType.uri
    const childAssociations = await prisma.cFAssociation.findMany({
      where: {
        associationType: "isChildOf",
        destinationNode: {
          uri: itemType.uri,
        },
      },
      include: {
        originNode: true,
      },
    });

    // 2. Find cfItemTypes whose uri is in the originNode.uri of the associations
    const childCfItemTypes = await prisma.cFItemType.findMany({
      where: {
        uri: {
          in: childAssociations.map((assoc) => assoc.originNode.uri),
        },
      },
    });
    const itemTypes = [itemType, ...childCfItemTypes];

    res.json(mapItemTypes(itemTypes));
  } catch (error) {
    console.error("Error fetching item type:", error);
    errors.internalError(res);
  }
});

export { router as definitionsRouter };
