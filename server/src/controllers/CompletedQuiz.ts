import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { ApiError } from '../exceptions/ApiError';
import CompletedQuizModel from '../models/CompletedQuiz';

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}
		
		const doc = new CompletedQuizModel({
			userId: res.locals.userId,
			quizId: req.body.quizId,
			correct: req.body.correct,
			incorrect: req.body.incorrect,
			timeResult: req.body.timeResult,
		});

		const quiz = await doc.save();

		res.json(quiz);
	} catch (err) {
		next(err);	
	}
}


export const getOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quiz = await CompletedQuizModel.findOne({
			_id: req.params.quizId,
			userId: res.locals.userId,
		});

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id not found'));
		}

		res.json(quiz);
	} catch (err) {
		next(err);
	}
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quiz = await CompletedQuizModel.findOneAndDelete({
			_id: req.params.quizId,
			userId: res.locals.userId,
		});

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id not found'));
		}

		res.status(200).send();
	} catch (err) {
		next(err);
	}
}