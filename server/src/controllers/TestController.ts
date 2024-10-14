import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { ApiError } from '../exceptions/ApiError';
import TestModel from '../models/Test';
import UserModel from '../models/User';

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
		const test = await TestModel.findOne({ authorId: res.locals.userId, _id: req.params.id });
		console.log(test);

		res.json(test);
	} catch (err) {
		next(err);
	}
}


export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await TestModel.findOneAndDelete({
			authorId: res.locals.userId,
			_id: req.params.id,
		});

		res.status(200).send();
	} catch (err) {
		next(err);
	}
}