import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/ApiError';
import QuizModel from '../models/Quiz';
import QuizRatingModel from '../models/QuizRating';

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const rating = await QuizRatingModel.findById(req.params.ratingId);

		if (!rating) {
			return next(ApiError.BadRequest('Rating with such id does not exist'));
		}

		res.json(rating);
	} catch (err) {
		next(err);
	}
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quizRatings = QuizRatingModel.find({
			quizId: req.params.quizId
		});

		if (!quizRatings) {
			return next(ApiError.BadRequest('Bad request'));
		}

		res.json(quizRatings);
	} catch (err) {
		next(err);
	}
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError);
		}

		const quiz = await QuizModel.findById(req.params.quizId);

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id does not exist'));
		}

		const quizRating = new QuizRatingModel({
			rate: req.body.rate,
			quizId: req.params.quizId,
			authorId: res.locals.userId,
		});

		const ratingDoc = await quizRating.save();

		res.json(ratingDoc);
	} catch (err) {
		next(err);
	}
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError);
		}

		const quizRating = await QuizRatingModel.findOneAndDelete({
			_id: req.params.ratingId,
			quizId: req.params.quizId,
			authorId: res.locals.userId,
		});

		if (!quizRating) {
			return next(ApiError.BadRequest('Quiz with such id does not exist'));
		}

		res.status(200).send();
	} catch (err) {
		next(err);
	}
}