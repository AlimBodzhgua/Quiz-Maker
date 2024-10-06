import { Router } from 'express';

const router = Router();

// POST /api/tests - создать тест
// GET /api/tests - получить все тесты, которые созданы текущим пользователем
// GET /api/tests/:id - получить тест по id
// PUT /api/tests - обновить тест
// DELETE /api/tests/:id - удалить тест по id
// GET /api/tests/completed - получить список пройденных тестов текущим пользователем
// GET /api/tests/completed/:id - получить детальную информацию по пройденному тесту (c правильными\неправильными ответами)

// /tests
// router.post('/', );
// router.get('/', );
// router.get('/:id', );
// router.put('/', );
// router.delete('/:id', );
// router.get('/completed', );
// router.delete('/completed/:id', );


export default router;