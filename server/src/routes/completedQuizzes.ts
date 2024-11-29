import { requireAuth } from '../middleware/requireAuth';
import { Router } from 'express';
import { completedQuizCreateValidation } from '../validations/validations';
import * as CompletedQuizController from '../controllers/CompletedQuiz';

const router = Router({ mergeParams: true });

// /quizzes/completed

router.post('/', requireAuth, completedQuizCreateValidation, CompletedQuizController.create);
router.get('/', requireAuth, CompletedQuizController.getAll);
router.get('/:quizId', requireAuth, CompletedQuizController.getOne);
router.delete('/:quizId', requireAuth, CompletedQuizController.remove);

export default router;