import { Router } from 'express';
import { questionValidation } from '../validations/validations';
import { requireAuth } from '../middleware/requireAuth';
import * as QuestionController from '../controllers/QuestionController';

const router = Router({ mergeParams: true });

// /tests/:testId/questions
router.post('/', requireAuth, questionValidation, QuestionController.create);
router.delete('/:id', requireAuth, QuestionController.remove);
router.get('/', requireAuth, QuestionController.getAll);
router.get('/:id', requireAuth, QuestionController.getOne);


export default router;