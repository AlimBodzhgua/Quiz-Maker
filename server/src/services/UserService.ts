import bcrypt from 'bcrypt';
import { HashService } from './HashService';
import { TokenService } from './TokenService';
import { ApiError } from '../exceptions/ApiError';
import UserModel from '../models/User';

type CheckUserData = {
	id?: string;
	email?: string;
}

export class UserService {
	
	static checkIfUserExists = async (userData: CheckUserData) => {
		const filterObj = {
			...(userData.id && { _id: userData.id }),
			...(userData.email && { email: userData.email }),
		};

		const user = await UserModel.findOne(filterObj);

		if (!user) {
			throw ApiError.BadRequest('Such user does not exist');
		}

		return user;
	};

	static register = async (email: string, password: string) => {
		const candidate = await UserModel.findOne({ email: email });

		if (candidate) {
			throw ApiError.BadRequest('Such user already exist');
		}

		const hash = await HashService.generateHashPassword(password);

		const newUserDoc = new UserModel({
			email: email,
			passwordHash: hash,
		});

		const user = await newUserDoc.save();
		const token = TokenService.generateToken(user._id);

		const { passwordHash, ...userData } = user._doc;

		return { userData, token };
	};

	static login = async (email: string, password: string) => {
		const user = await UserService.checkIfUserExists({ email: email });

		const isValidPassword = await bcrypt.compare(password, user._doc.passwordHash);

		if (!isValidPassword) {
			throw ApiError.BadRequest('Wrond password or email');
		}

		const token = TokenService.generateToken(user._id);

		const { passwordHash, ...userData } = user._doc;

		return { userData, token };
	};
}