import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { rateQuizValidation } from '../validations/validations';
import * as QuizRatingController from '../controllers/QuizRatingController';

const router = Router({ mergeParams: true });

// //quizzes/:quizId/rating

router.post('/', requireAuth, rateQuizValidation, QuizRatingController.create);
router.get('/', requireAuth, QuizRatingController.getAll);
router.delete('/', requireAuth, QuizRatingController.remove);
router.get('/:ratingId', requireAuth, QuizRatingController.getOne);

export default router;