import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { ApiError } from '../exceptions/ApiError';
import { Quiz } from '../types/types';
import QuizModel from '../models/Quiz';
import UserModel from '../models/User';

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}
		
		const doc = new QuizModel({
			title: req.body.title,
			authorId: res.locals.userId,
			withTimer: req.body.withTimer,
			timerLimit: req.body.timerLimit,
			privacy: req.body.privacy,
		});

		const quiz = await doc.save();

		res.json(quiz);
	} catch (err) {
		next(err);	
	}
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		let quizzes = await QuizModel.find<Quiz>();

		const privacy = req.query.privacy;
		const authorId = req.query.authorId;

		
		if (authorId) {
			const user = await UserModel.findById(authorId);

			if (!user) {
				return next(ApiError.BadRequest('User does not exist'));
			}
			quizzes = quizzes.filter((quiz) => String(quiz.authorId) === authorId);
		}

		if (privacy) {
			quizzes = quizzes.filter((quiz) => quiz.privacy === privacy);
		}

		res.json(quizzes);
	} catch (err) {
		next(err);
	}
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quiz = await QuizModel.findOne({ _id: req.params.quizId });

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
		const quiz = await QuizModel.findOneAndDelete({
			_id: req.params.quizId,
			authorId: res.locals.userId,
		});

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id not found'));
		}

		res.status(200).send();
	} catch (err) {
		next(err);
	}
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const quiz = await QuizModel.findOneAndUpdate(
			{
				_id: req.params.quizId,
				authorId: res.locals.userId,
			},
			{
				title: req.body.title,
				withTimer: req.body.withTimer,
				timerLimit: req.body.timerLimit,
				privacy: req.body.privacy,
			},
			{ new: true }
		);

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id not found'));
		}

		res.status(200).send(quiz);
	} catch (err) {
		next(err);
	}
}