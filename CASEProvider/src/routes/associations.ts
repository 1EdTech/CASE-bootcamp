import { Router } from 'express';
import prisma from '../lib/prisma';
import { errors } from '../lib/errors';
import { validateSourcedId } from '../lib/validation';
import { mapAssociation, mapAssociations } from '../mappers/associations';

const router = Router();

/**
 * This is a request to the service provider to provide the information for the
 * specific Competency Framework Association. If the identified record cannot
 * be found then the 'unknownobject' status code must be reported.
 */
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

/**
 * This is a request to the Service Provider to provide the all of the
 * Competency Associations for the specified CFItem and the information
 * about the CFItem itself. If the identified record cannot be found then the
 * 'unknownobject' status code must be reported.
 */
// GET /CFItemAssociations/{sourcedId}
router.get('/CFItemAssociations/:sourcedId', validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const item = await prisma.cFItem.findUnique({
      where: { identifier: sourcedId },
    });

    console.log('Fetched item with associations:', item);

    if (!item) {
      return errors.notFound(res);
    }

    const associations = await prisma.cFAssociation.findMany({
      where: {
        OR: [
          { originNode: {
            uri: item.uri,
          } },
          { destinationNode: {
            uri: item.uri,
          } },
        ]
      },
    });
    res.json(mapAssociations(item, associations));
  } catch (error) {
    console.error('Error fetching item associations:', error);
    errors.internalError(res);
  }
});

export { router as associationsRouter };
