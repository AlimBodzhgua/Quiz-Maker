import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/ApiError';
import { QuizService } from '../services/QuizService';
import QuizRatingModel from '../models/QuizRating';

type QuizRatingParams = {
	quizId: string;
	ratingId: string;
}

export const getOne = async (req: Request<QuizRatingParams>, res: Response, next: NextFunction) => {
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

export const getAll = async (req: Request<QuizRatingParams>, res: Response, next: NextFunction) => {
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

export const create = async (req: Request<QuizRatingParams>, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError);
		}

		await QuizService.checkIfQuizExists(req.params.quizId);

		await QuizRatingModel.findOneAndDelete({
			quizId: req.params.quizId,
			authorId: res.locals.userId,
		});

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

export const remove = async (req: Request<QuizRatingParams>, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError);
		}

		const quizRating = await QuizRatingModel.findOneAndDelete({
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