import { Router } from 'express';
import prisma from '../lib/prisma';
import { errors } from '../lib/errors';
import { validateSourcedId } from '../lib/validation';
import { mapRubric } from '../mappers/rubrics';

const router = Router();

/**
 * This is a request to the service provider to provide the information for
 * the specific Competency Framework Rubric. If the identified record cannot be
 * found then the 'unknownobject' status code must be reported.
 */
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

export { router as rubricsRouter };
