import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { ApiError } from '../exceptions/ApiError';
import TestModel from '../models/Test';

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}
		
		const doc = new TestModel({
			title: req.body.title,
			authorId: res.locals.userId,
		});

		const test = await doc.save();

		res.json(test);
	} catch (err) {
		next(err);	
	}
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tests = await TestModel.find({ authorId: res.locals.userId });

		res.json(tests);
	} catch (err) {
		next(err);
	}
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const test = await TestModel.findOne({
			_id: req.params.testId,
			authorId: res.locals.userId,
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
		const test = await TestModel.findOneAndDelete({
			_id: req.params.testId,
			authorId: res.locals.userId,
		});

		if (!test) {
			return next(ApiError.BadRequest('Test with such id not found'));
		}

		res.status(200).send();
	} catch (err) {
		next(err);
	}
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const test = await TestModel.findOneAndUpdate(
			{
				_id: req.params.testId,
				authorId: res.locals.userId,
			},
			{
				title: req.body.title,
			},
			{ new: true }
		);

		if (!test) {
			return next(ApiError.BadRequest('Test with such id not found'));
		}

		res.status(200).send(test);
	} catch (err) {
		next(err);
	}
}