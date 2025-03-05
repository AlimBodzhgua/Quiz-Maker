import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/ApiError';
import { UserService } from '../services/UserService';
import type { IUser, PublicUserData } from '../types/types';
import UserModel from '../models/User';

export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const user = await UserService.register(req.body.email, req.body.password);

		res.json(user);
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

		const { email, password } = req.body;
		const user = await UserService.login(email, password);

		res.json(user);
	} catch (err) {
		next(err);
	}
}

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserService.checkIfUserExists({ id: res.locals.userId });

		const { passwordHash, ...userData } = user._doc;

		res.json({...userData, token: res.locals.token});
	} catch (err) {
		next(err);
	}
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return next(ApiError.ValidationError(errors.array()));
		}

		const { userId } = req.query;

		const users = await UserModel.find<IUser>();
		let publicUsersData = users.map((user) => ({_id: user._id, email: user.email})) as PublicUserData[];

		if (userId) {
			publicUsersData = publicUsersData.filter((user) => String(user._id) === userId);
		}

		res.json(publicUsersData);
	} catch (err) {
		next(err);
	}
}