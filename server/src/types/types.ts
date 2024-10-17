import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface DocResult<T> {
	_doc: T;
}

export type DecodePayloadType = JwtPayload & { _id: string };

type QuestionType = 'multipleAnswer' | 'oneAnswer' | 'inputAnswer' | 'trueOrFalse' // checkbox/radioButton/input

export interface IUser extends DocResult<IUser> {
	_id: Types.ObjectId;
	email: string;
	passwordHash: string;
}

export interface ITest {
	_id: Types.ObjectId;
	title: string;
	authorId: Types.ObjectId;
	createAt: Date;
}

export interface IQuestion {
	_id: Types.ObjectId;
	description: string;
	testId: Types.ObjectId;
	type: QuestionType; 
	order: number; // question number
}

export interface IAnswer {
	_id: Types.ObjectId;
	value: string;
	isCorrect: boolean;
	questionId: Types.ObjectId;
}

export interface ICompletedTest {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	testId: Types.ObjectId;
	right: number;
	wrong: number;
}


// export interface IUserAnswer {

// }
