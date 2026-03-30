import { Router } from "express";
import prisma from "../lib/prisma";
import { errors } from "../lib/errors";
import { validateSourcedId } from "../lib/validation";
import { mapPackage } from "../mappers/packages";

const router = Router();

/**
 * This is a request to the service provider to provide the information for the
 * specific Competency Framework Package. If the identified record cannot be
 * found then the 'unknownobject' status code must be reported.
 */
// GET /CFPackages/{sourcedId}
router.get("/CFPackages/:sourcedId", validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const cfPackage = await prisma.cFPackage.findUnique({
      where: { identifier: sourcedId },
      include: {
        document: {
          include: {
            subjects: true,
            cfLicense: true,
            packageUri: true,
            cfItems: {
              include: {
                conceptKeywordsURI: true,
                subjectURI: true,
                cfItemTypeUri: true,
                licenseURI: true,
              },
            },
            cfAssociations: {
              include: {
                originNode: true,
                destinationNode: true,
              },
            },
          },
        },
        cfConcepts: true,
        cfItemTypes: true,
        cfLicenses: true,
        cfRubrics: {
          include: {
            cfRubricCriteria: {
              include: {
                CFRubricCriterionLevels: true,
              },
            },
          },
        },
        cfSubjects: true,
        cfAssociationGroupings: true,
      },
    });

    if (!cfPackage) {
      return errors.notFound(res);
    }

    res.json(mapPackage(cfPackage));
  } catch (error) {
    console.error("Error fetching package:", error);
    errors.internalError(res);
  }
});

export { router as packagesRouter };
