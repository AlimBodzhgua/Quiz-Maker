import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/ApiError';
import QuizModel from '../models/Quiz';
import QuestionModel from '../models/Question';
import AnswerModel from '../models/Answer';

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quiz = await QuizModel.findById(req.params.quizId);

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id not found'));
		}

		const question = await QuestionModel.findOne({
			_id: req.params.questionId,
			quizId: req.params.quizId,
		});

		if (!question) {
			return next(ApiError.BadRequest('Question with such id not found'));
		}

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


export const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quiz = await QuizModel.findById(req.params.quizId);

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id not found'));
		}

		const question = await QuestionModel.findOne({
			_id: req.params.questionId,
			quizId: req.params.quizId,
		});

		if (!question) {
			return next(ApiError.BadRequest('Question with such id not found'));
		}

		const answers = await AnswerModel.find({ questionId: req.params.questionId });

		res.send(answers);
	} catch (err) {
		next(err);
	}
}