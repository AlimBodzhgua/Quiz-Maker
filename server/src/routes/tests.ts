import { requireAuth } from './../middleware/requireAuth';
import { Router } from 'express';
import { testCreateValidation, testRemoveValidation } from './../validations/validations';
import * as TestController from '../controllers/TestController';

const router = Router();

// POST /api/tests - создать тест
// GET /api/tests - получить все тесты, которые созданы текущим пользователем
// GET /api/tests/:id - получить тест по id
// PUT /api/tests - обновить тест
// DELETE /api/tests/:id - удалить тест по id
// GET /api/tests/completed - получить список пройденных тестов текущим пользователем
// GET /api/tests/completed/:id - получить детальную информацию по пройденному тесту (c правильными\неправильными ответами)

// /tests
router.post('/', requireAuth, testCreateValidation, TestController.create);;
router.get('/', requireAuth, TestController.getAll);
router.get('/:testId', requireAuth, TestController.getOne);
router.delete('/:testId', requireAuth, TestController.remove);
router.put('/:testId', requireAuth, testCreateValidation, TestController.update);
// router.get('/completed', );
// router.delete('/completed/:id', );


export default router;