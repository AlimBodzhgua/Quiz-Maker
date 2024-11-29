import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { answerValidation } from '../validations/validations';
import * as AnswerController from '../controllers/AnswerController';

const router = Router({ mergeParams: true });

// /quizzes/:quizId/questions/:questionId/answers

router.post('/', requireAuth, answerValidation, AnswerController.create);
router.get('/', requireAuth, AnswerController.getAll);

export default router;