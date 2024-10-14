import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/ApiError';
import TestModel from '../models/Test';
import QuestionModel from '../models/Question';

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const test = await TestModel.findById({ _id: req.params.testId });

		if (!test) {
			return next(ApiError.BadRequest('Test with such id not found'));
		}

		const doc = await QuestionModel.create({
			description: req.body.description,
			testId: req.params.testId,
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
		const test = await TestModel.findById(req.params.testId );

		if (!test) {
			return next(ApiError.BadRequest('Test with such id not found'));
		}

		const result = await QuestionModel.findOneAndDelete({
			testId: req.params.testId,
			_id: req.params.id,
		})

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
		const test = await TestModel.findById(req.params.testId);

		if (!test) {
			return next(ApiError.BadRequest('Test with such id not found'));
		}

		const questions = await QuestionModel.find({ testId: test._id });

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
		const test = await TestModel.findById(req.params.testId);

		if (!test) {
			return next(ApiError.BadRequest('Test with such id not found'));
		}

		const question = await QuestionModel.findOne({ testId: test._id, _id: req.params.id });

		if (!question) {
			return next(ApiError.BadRequest('Question with such id not found'));
		}

		res.json(question);
	} catch (err) {
		next(err);
	}
}
