import { requireAuth } from '../middleware/requireAuth';
import { Router } from 'express';
import { quizCreateValidation } from '../validations/validations';
import * as QuizController from '../controllers/QuizController';

const router = Router();

// /quizzes
router.post('/', requireAuth, quizCreateValidation, QuizController.create);;
router.get('/', requireAuth, QuizController.getAll);
router.get('/:quizId', requireAuth, QuizController.getOne);
router.delete('/:quizId', requireAuth, QuizController.remove);
router.put('/:quizId', requireAuth, quizCreateValidation, QuizController.update);

export default router;