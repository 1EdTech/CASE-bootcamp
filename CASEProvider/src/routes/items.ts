import { Router } from 'express';
import prisma from '../lib/prisma';
import { errors } from '../lib/errors';
import { validateSourcedId } from '../lib/validation';

const router = Router();

/**
 * This is a request to the Service Provider to provide the specified
 * Competency Framework Item. If the identified record cannot be found then
 * the 'unknownobject' status code must be reported.
 */
// GET /CFItems/{sourcedId}
router.get('/CFItems/:sourcedId', validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const item = await prisma.cFItem.findUnique({
      where: { identifier: sourcedId },
      include: {
        cfDocument: true,
        subjectURI: true,
        cfItemTypeUri: true,
        conceptKeywordsURI: true,
        licenseURI: true,
      }
    });

    if (!item) {
      return errors.notFound(res);
    }

    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    errors.internalError(res);
  }
});

// GET /CFItems - List all items
router.get('/CFItems', async (req, res) => {
  try {
    const { limit = '100', offset = '0' } = req.query;

    const items = await prisma.cFItem.findMany({
      take: parseInt(limit as string),
      skip: parseInt(offset as string)
    });

    res.json({ CFItems: items });
  } catch (error) {
    console.error('Error fetching items:', error);
    errors.internalError(res);
  }
});

export { router as itemsRouter };
