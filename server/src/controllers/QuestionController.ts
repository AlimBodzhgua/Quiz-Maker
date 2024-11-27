import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/ApiError';
import QuizModel from '../models/Quiz';
import QuestionModel from '../models/Question';
import mongoose from 'mongoose';

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const quiz = await QuizModel.findById({ _id: req.params.quizId });

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id not found'));
		}

		const doc = await QuestionModel.create({
			_id: mongoose.Types.ObjectId.createFromHexString(req.body._id),
			description: req.body.description,
			quizId: req.params.quizId,
			type: req.body.type,
			order: req.body.order,
		});
		console.log(doc);

		const question = await doc.save();

		res.json(question);
	} catch (err) {
		next(err);
	}
}


export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quiz = await QuizModel.findById(req.params.quizId);

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id not found'));
		}

		const result = await QuestionModel.findOneAndDelete({
			quizId: req.params.quizId,
			_id: req.params.id,
		});

		if (!result) {
			return next(ApiError.BadRequest('Question not found'));
		}

		res.status(200).send();
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

		const questions = await QuestionModel.find({ quizId: quiz._id });

		if (!questions.length) {
			return next(ApiError.BadRequest('Questions not found'));
		}

		res.json(questions);
	} catch (err) {
		next(err);
	}
}


export const getOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quiz = await QuizModel.findById(req.params.quizId);

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id not found'));
		}

		const question = await QuestionModel.findOne({ quizId: quiz._id, _id: req.params.id });

		if (!question) {
			return next(ApiError.BadRequest('Question with such id not found'));
		}

		res.json(question);
	} catch (err) {
		next(err);
	}
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quiz = await QuizModel.findById(req.params.quizId);

		if (!quiz) {
			return next(ApiError.BadRequest('Quiz with such id not found'));
		}

		const question = await QuestionModel.findOneAndUpdate(
			{
				quizId: quiz._id,
				_id: req.params.id,
			},
			{
				description: req.body.description,
				quizId: req.params.quizId,
				type: req.body.type,
				order: req.body.order,
			},
			{ new: true },
		);
		console.log(question);
		res.json(question);
	} catch (err) {
		next(err);
	}
}