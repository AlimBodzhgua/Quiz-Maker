import { Router } from 'express';
import answersRoutes from './answers';
import usersRoutes from './users';
import quizzesRoutes from './quizzes';
import questionsRoutes from './questions';
import completedQuizzesRoutes from './completedQuizzes';
import quizRatingRoutes  from './quizRating';

const router = Router({ strict: true });

router.use('/users', usersRoutes);
router.use('/quizzes', quizzesRoutes);
router.use('/quizzes/:quizId/questions', questionsRoutes);
router.use('/quizzes/:quizId/questions/:questionId/answers', answersRoutes);
router.use('/quizzes/:quizId/rating', quizRatingRoutes);
router.use('/completed-quizzes', completedQuizzesRoutes);

export default router;