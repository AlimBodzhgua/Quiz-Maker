import { Router } from 'express';
import answersRoutes from './answers';
import usersRoutes from './users';
import testsRoutes from './tests';

const router = Router({ strict: true });

router.use('/users', usersRoutes);
router.use('/tests', testsRoutes);
router.use('/answers', answersRoutes);

export default router;