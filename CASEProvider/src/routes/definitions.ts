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

/**
 * This is a request to the Service Provider to provide the specified
 * Competency Framework Association Grouping. If the identified record
 * cannot be found then the 'unknownobject' status code must be reported.
 */
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

/**
 * This is a request to the Service Provider to provide the specified
 * Competency Framework Concept and the set of children CFConcepts
 * as identified by the hierarchy codes. If the identified record cannot be
 * found then the 'unknownobject' status code must be reported.
 */
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

    // add all child concepts, as identified by the hierarchy codes
    const childCfConcepts = await prisma.cFConcept.findMany({
      where: {
        hierarchyCode: {
          startsWith: concept.hierarchyCode,
        },
        identifier: {
          not: concept.identifier,
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

/**
 * This is a request to the Service Provider to provide the specified
 * Competency Framework Subject and the set of children CFSubjects as
 * identified by the hierarchy codes. If the identified record cannot be
 * found then the 'unknownobject' status code must be reported.
 */
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

    // add all child subjects, as identified by the hierarchy codes
    const childCfSubjects = await prisma.cFSubject.findMany({
      where: {
        hierarchyCode: {
          startsWith: subject.hierarchyCode,
        },
        identifier: {
          not: subject.identifier,
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

/**
 * This is a request to the Service Provider to provide the specified
 * Competency Framework License. If the identified record cannot be found then
 * the 'unknownobject' status code must be reported.
 */
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

/**
 * This is a request to the Service Provider to provide the specified
 * Competency Framework Item Type and the set of children CFItemTypes as
 * identified by the hierarchy codes. If the identified record cannot be
 * found then the 'unknownobject' status code must be reported.
 */
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

    // add all child item types, as identified by the hierarchy codes
    const childCfItemTypes = await prisma.cFItemType.findMany({
      where: {
        hierarchyCode: {
          startsWith: itemType.hierarchyCode,
        },
        identifier: {
          not: itemType.identifier,
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
