import { Router } from 'express';
import { questionUpdateValidation, questionValidation } from '../validations/validations';
import { requireAuth } from '../middleware/requireAuth';
import * as QuestionController from '../controllers/QuestionController';

const router = Router({ mergeParams: true });

// /quizzes/:quizId/questions

router.post('/', requireAuth, questionValidation, QuestionController.create);
router.delete('/:id', requireAuth, QuestionController.remove);
router.get('/', requireAuth, QuestionController.getAll);
router.get('/:id', requireAuth, QuestionController.getOne);
router.put('/:id', requireAuth, questionUpdateValidation, QuestionController.update);

export default router;