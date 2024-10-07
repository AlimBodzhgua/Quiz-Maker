import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import { ApiError } from '../exceptions/ApiError';
import { HashService } from '../services/HashService';
import { TokenService } from '../services/TokenService';
import UserModel from '../models/User';

export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const candidate = await UserModel.findOne({ email: req.body.email });

		if (candidate) {
			return next(ApiError.BadRequest('User with such email already exist'));
		}

		const hash = await HashService.generateHashPassword(req.body.password);

		const newUserDoc = new UserModel({
			email: req.body.email,
			passwordHash: hash,
		});

		const user = await newUserDoc.save();
		const token = TokenService.generateToken(user._id);
		
		const { passwordHash, ...userData } = user._doc;

		res.json({...userData, token});
	} catch (err) {
		next(err);
	}
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return next(ApiError.BadRequest('Wrong password or email'));
		}

		const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

		if (!isValidPassword) {
			return next(ApiError.BadRequest('Wrond password or email'));
		}

		const token = TokenService.generateToken(user._id);

		const { passwordHash, ...userData } = user._doc;

		res.json({...userData, token});
	} catch (err) {
		next(err);
	}
}

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserModel.findById(res.locals.userId);

		if (!user) {
			return next(ApiError.BadRequest('Such user does not exist'));
		};

		const { passwordHash, ...userData } = user._doc;

		res.json({...userData, token: res.locals.token});
	} catch (err) {
		next(err);
	}
}