import { requireAuth } from '../middleware/requireAuth';
import { Router } from 'express';
import {
	completedQuizCreateValidation,
	quizCreateValidation,
	quizRemoveValidation,
} from '../validations/validations';
import * as QuizController from '../controllers/QuizController';
import * as CompletedQuizController from '../controllers/CompletedQuiz';

const router = Router();

// /quizs
router.post('/', requireAuth, quizCreateValidation, QuizController.create);;
router.get('/', requireAuth, QuizController.getAll);
router.get('/:quizId', requireAuth, QuizController.getOne);
router.delete('/:quizId', requireAuth, QuizController.remove);
router.put('/:quizId', requireAuth, quizCreateValidation, QuizController.update);

router.get('/completed/:id', requireAuth, CompletedQuizController.getOne);
router.delete('/completed/:id', requireAuth, CompletedQuizController.remove);
router.post('/completed', requireAuth, completedQuizCreateValidation, CompletedQuizController.create);


export default router;