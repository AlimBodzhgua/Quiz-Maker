import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { answerValidation } from '../validations/validations';
import * as AnswerController from '../controllers/AnswerController';

const router = Router({ mergeParams: true });

// POST /api/answers/:answer_id - ответить
// GET /api/answers/:test_id - получить ответы пользователя на тест по ID теста

// /answers
router.post('/', requireAuth, answerValidation, AnswerController.create);
router.get('/', requireAuth, AnswerController.getAll);

export default router;