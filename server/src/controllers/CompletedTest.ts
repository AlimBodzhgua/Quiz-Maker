import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { ApiError } from '../exceptions/ApiError';
import CompletedTestModel from '../models/CompletedTest';

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}
		
		const doc = new CompletedTestModel({
			userId: res.locals.userId,
			testId: req.body.testId,
			correct: req.body.correct,
			incorrect: req.body.incorrect,
			timeResult: req.body.timeResult,
		});

		const test = await doc.save();

		res.json(test);
	} catch (err) {
		next(err);	
	}
}


export const getOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const test = await CompletedTestModel.findOne({
			_id: req.params.testId,
			userId: res.locals.userId,
		});

		if (!test) {
			return next(ApiError.BadRequest('Test with such id not found'));
		}

		res.json(test);
	} catch (err) {
		next(err);
	}
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const test = await CompletedTestModel.findOneAndDelete({
			_id: req.params.testId,
			userId: res.locals.userId,
		});

		if (!test) {
			return next(ApiError.BadRequest('Test with such id not found'));
		}

		res.status(200).send();
	} catch (err) {
		next(err);
	}
}