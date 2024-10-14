import { Router } from 'express';
import answersRoutes from './answers';
import usersRoutes from './users';
import testsRoutes from './tests';
import questionsRoutes from './questions';

const router = Router({ strict: true });

router.use('/users', usersRoutes);
router.use('/tests', testsRoutes);
router.use('/tests/:testId/questions', questionsRoutes);
router.use('/tests/:testId/questions/:questionId/answers', answersRoutes);

export default router;