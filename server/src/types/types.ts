import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface DocResult<T> {
	_doc: T;
}

export type DecodePayloadType = JwtPayload & { _id: string };

type QuestionType = 'multipleAnswer' | 'oneAnswer' | 'inputAnswer' | 'trueOrFalse' // checkbox/radioButton/input
type QuizPrivacy = 'public' | 'private' | 'privateLink' | 'privateLinkPassword' | 'privateUsers';

export interface IUser extends DocResult<IUser> {
	_id: Types.ObjectId;
	email: string;
	passwordHash: string;
}

export type IPublicUserData = Omit<IUser, 'passwordHash'>;

export type TimerValues = 'minutes' | 'seconds';
export type TimerLimit = Record<TimerValues, number>;

export interface IQuiz {
	_id: Types.ObjectId;
	title: string;
	authorId: Types.ObjectId;
	createAt: Date;
	privacy: QuizPrivacy;
	withTimer?: boolean;
	timerLimit?: TimerLimit;
}

export interface IQuestion {
	_id: Types.ObjectId;
	description: string;
	quizId: Types.ObjectId;
	type: QuestionType; 
	order: number; // question number
}

export interface IAnswer {
	_id: Types.ObjectId;
	value: string;
	isCorrect: boolean;
	order: number;
	questionId: Types.ObjectId;
}

export interface ICompletedQuiz {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	quizId: Types.ObjectId;
	quizTitle: string;
	correct: number;
	incorrect: number;
	timeResult?: TimerLimit;
	date: string;
}


// export interface IUserAnswer {

// }
