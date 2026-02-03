import { Router } from 'express';
import prisma from '../lib/prisma';
import { errors } from '../lib/errors';
import { validateSourcedId } from '../lib/validation';
import { mapRubric, mapRubricCriteria } from '../mappers/rubrics';

const router = Router();

// GET /CFRubrics/{sourcedId}
router.get('/CFRubrics/:sourcedId', validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const rubric = await prisma.cFRubric.findUnique({
      where: { identifier: sourcedId },
      include: {
        cfRubricCriteria: {
          include: {
            CFRubricCriterionLevels: true
          }
        }
      }
    });

    if (!rubric) {
      return errors.notFound(res);
    }

    res.json(mapRubric(rubric));
  } catch (error) {
    console.error('Error fetching rubric:', error);
    errors.internalError(res);
  }
});

// GET /CFRubricCriteria/{sourcedId}
router.get('/CFRubricCriteria/:sourcedId', validateSourcedId, async (req, res) => {
  try {
    const { sourcedId } = req.params;

    const criterion = await prisma.cFRubricCriterion.findUnique({
      where: { identifier: sourcedId },
      include: {
        cfRubric: true,
        cfItem: true
      }
    });

    if (!criterion) {
      return errors.notFound(res);
    }

    res.json(mapRubricCriteria(criterion));
  } catch (error) {
    console.error('Error fetching rubric criterion:', error);
    errors.internalError(res);
  }
});

export { router as rubricsRouter };
