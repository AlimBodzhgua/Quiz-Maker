import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/ApiError';
import TestModel from '../models/Test';
import QuestionModel from '../models/Question';
import AnswerModel from '../models/Answer';

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const test = await TestModel.findById(req.params.testId);

		if (!test) {
			return next(ApiError.BadRequest('Test with such id not found'));
		}

		const question = await QuestionModel.findOne({
			_id: req.params.questionId,
			testId: req.params.testId,
		});

		if (!question) {
			return next(ApiError.BadRequest('Question with such id not found'));
		}

		const doc = new AnswerModel({
			isCorrect: req.body.isCorrect,
			value: req.body.value,
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
		const test = await TestModel.findById(req.params.testId);

		if (!test) {
			return next(ApiError.BadRequest('Test with such id not found'));
		}

		const question = await QuestionModel.findOne({
			_id: req.params.questionId,
			testId: req.params.testId,
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