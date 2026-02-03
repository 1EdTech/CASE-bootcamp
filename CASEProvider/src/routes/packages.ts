import { Router } from 'express';
import prisma from '../lib/prisma';
import { errors } from '../lib/errors';
import { validateSourcedId } from '../lib/validation';
import { mapPackage } from '../mappers/packages';

const router = Router();

// GET /CFPackages/{sourcedId}
router.get('/CFPackages/:sourcedId', validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const cfPackage = await prisma.cFPackage.findUnique({
      where: { identifier: sourcedId },
      include: {
        document: true,
        cfConcepts: true,
        cfItemTypes: true,
        cfLicenses: true,
        cfRubrics: true,
        cfSubjects: true,
        cfAssociationGroupings: true,
      }
    });

    if (!cfPackage) {
      return errors.notFound(res);
    }

    res.json(mapPackage(cfPackage));
  } catch (error) {
    console.error('Error fetching package:', error);
    errors.internalError(res);
  }
});

export { router as packagesRouter };
