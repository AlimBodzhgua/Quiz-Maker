import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { ApiError } from '../exceptions/ApiError';
import { QuizService } from '../services/QuizService';
import QuestionModel from '../models/Question';

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		await QuizService.checkIfQuizExists(req.params.quizId);

		const doc = await QuestionModel.create({
			_id: mongoose.Types.ObjectId.createFromHexString(req.body._id),
			description: req.body.description,
			quizId: req.params.quizId,
			isRequired: req.body.isRequired,
			type: req.body.type,
			order: req.body.order,
		});

		const question = await doc.save();

		res.json(question);
	} catch (err) {
		next(err);
	}
}


export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await QuizService.checkIfQuizExists(req.params.quizId);

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
		await QuizService.checkIfQuizExists(req.params.quizId);

		const questions = await QuestionModel.find({ quizId: req.params.quizId });

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
		await QuizService.checkIfQuizExists(req.params.quizId);

		const question = await QuestionModel.findOne({ quizId: req.params.quizId, _id: req.params.id });

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
		await QuizService.checkIfQuizExists(req.params.quizId);


		const question = await QuestionModel.findOneAndUpdate(
			{
				quizId: req.params.quizId,
				_id: req.params.id,
			},
			{
				description: req.body.description,
				quizId: req.params.quizId,
				type: req.body.type,
				isRequired: req.body.isRequired,
				order: req.body.order,
			},
			{ new: true },
		);
		res.json(question);
	} catch (err) {
		next(err);
	}
}