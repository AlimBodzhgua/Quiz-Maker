import { requireAuth } from './../middleware/requireAuth';
import { Router } from 'express';
import { completedTestCreateValidation, testCreateValidation, testRemoveValidation } from './../validations/validations';
import * as TestController from '../controllers/TestController';
import * as CompletedTestController from '../controllers/CompletedTest';

const router = Router();

// /tests
router.post('/', requireAuth, testCreateValidation, TestController.create);;
router.get('/', requireAuth, TestController.getAll);
router.get('/:testId', requireAuth, TestController.getOne);
router.delete('/:testId', requireAuth, TestController.remove);
router.put('/:testId', requireAuth, testCreateValidation, TestController.update);

router.get('/completed/:id', requireAuth, CompletedTestController.getOne);
router.delete('/completed/:id', requireAuth, CompletedTestController.remove);
router.post('/completed/:id', requireAuth, completedTestCreateValidation, CompletedTestController.create);


export default router;