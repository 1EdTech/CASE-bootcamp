import { Router } from 'express';
import prisma from '../lib/prisma';
import { errors } from '../lib/errors';
import { validateSourcedId } from '../lib/validation';
import { mapAssociation } from '../mappers/associations';

const router = Router();

// GET /CFAssociations/{sourcedId}
router.get('/CFAssociations/:sourcedId', validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const association = await prisma.cFAssociation.findUnique({
      where: { identifier: sourcedId },
      include: {
        originNode: true,
        destinationNode: true,
        cfAssociationGrouping: true,
        cfDocument: true,
      }
    });

    console.log('Fetched association:', association);

    if (!association) {
      return errors.notFound(res);
    }

    res.json(mapAssociation(association));
  } catch (error) {
    console.error('Error fetching association:', error);
    errors.internalError(res);
  }
});

export { router as associationsRouter };
