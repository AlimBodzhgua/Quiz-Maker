import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { quizCreateValidation, quizUpdateValidation, quizzesQueryValidation } from '../validations/validations';
import * as QuizController from '../controllers/QuizController';

const router = Router();

// /quizzes
router.post('/', requireAuth, quizCreateValidation, QuizController.create);
router.get('/', requireAuth, quizzesQueryValidation, QuizController.getAll);
router.get('/count-public', requireAuth, QuizController.countPublicQuizzes);
router.get('/count-users', requireAuth, QuizController.countUserQuizzes);
router.get('/:quizId', requireAuth, QuizController.getOne);
router.delete('/:quizId', requireAuth, QuizController.remove);
router.put('/:quizId', requireAuth, quizUpdateValidation, QuizController.update);
router.get('/:quizId/generate-link', requireAuth, QuizController.generateLink);

export default router;