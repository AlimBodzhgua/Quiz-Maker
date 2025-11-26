import { Request, Response, NextFunction } from 'express';
import { QuizService } from '../services/QuizService';
import { QuestionService } from '../services/QuestionService';
import AnswerModel from '../models/Answer';

type AnswerParams = {
	quizId: string;
	questionId: string;
}

export const create = async (req: Request<AnswerParams>, res: Response, next: NextFunction) => {
	try {
		await QuizService.checkIfQuizExists(req.params.quizId);
		await QuestionService.checkIfQuestionExists(req.params.questionId);
	
		const doc = new AnswerModel({
			isCorrect: req.body.isCorrect,
			value: req.body.value,
			order: req.body.order,
			questionId: req.params.questionId,
		});

		const answer = await doc.save();

		res.send(answer);
	} catch (err) {
		next(err);
	}
}


export const getAll = async (req: Request<AnswerParams>, res: Response, next: NextFunction) => {
	try {
		await QuizService.checkIfQuizExists(req.params.quizId);
		await QuestionService.checkIfQuestionExists(req.params.questionId);

		const answers = await AnswerModel.find({ questionId: req.params.questionId });

		res.send(answers);
	} catch (err) {
		next(err);
	}
}