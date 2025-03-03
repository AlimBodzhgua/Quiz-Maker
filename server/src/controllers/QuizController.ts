import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { TokenService } from './../services/TokenService';
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

		const { privacy, authorId } = req.query;
		const page = (req.query.page || 1) as number;
		const limit = (req.query.limit || 10) as number;

		if (authorId) {
			const user = await UserModel.findById(authorId);

			if (!user) {
				return next(ApiError.BadRequest('User with such id does not exist'));
			}
		}

		const quizzes = await QuizModel.find<Quiz>({
			...(privacy && { 'privacy.type' : privacy }),
			...(authorId && { authorId : authorId }),
		});

		const from = page === 1 ? 1 : limit * page - limit;
		const to = limit * page;
		const result = quizzes.slice(from, to)

		res.json(result);
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

export const generateLink = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quiz = await QuizModel.findById(req.params.quizId);

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id does not exist'));
		}

		const token = TokenService.generateLinkToken();

		const link = `http://localhost:3000/quiz/${req.params.quizId}?token=${token}`;

		res.send({ link, token });
	} catch (err) {
		next(err);
	}
}


export const countPublicQuizzes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const count = await QuizModel.countDocuments({
			'privacy.type' : ['public', 'publicProtected', 'restrictedUsers']
		});

		res.json(count);
	} catch (err) {
		next(err);
	}
}

export const countUserQuizzes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const count = await QuizModel.countDocuments({
			'authorId' : res.locals.userId,
		});

		res.json(count);
	} catch (err) {
		next(err);
	}
}