import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface DocResult<T> {
	_doc: T;
}

export type DecodePayloadType = JwtPayload & { _id: string };

export interface IUser extends DocResult<IUser> {
	_id: Types.ObjectId;
	email: string;
	passwordHash: string;
}

export interface ITest {
	_id: Types.ObjectId;
	title: string;
	authorId: string;
	createAt: Date;
}

// export interface ICompletedTest {
// 	id: string;
// 	userId: string;
// 	testId: string;
// 	right: number; // amount of correct answers
// 	wrong: number; // amount of incorrect answers
// }

// export interface IQuestion {
// 	id: string;
// 	description: string;
// 	testId: string;
// 	//type: 
// 	order: number;
// }


// export interface IAnswer {
// 	id: string;
// 	value: string;
// 	isCorrect: boolean;
// 	questionId: string;
// }

// export interface IUserAnswer {

// }
