import { questionTypes } from './../constants/question';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { QuizPrivacyType } from './privacy';

export interface DocResult<T> {
	_doc: T;
}

export type DecodePayloadType = JwtPayload & { _id: string };


export interface IUser extends DocResult<IUser> {
	_id: Types.ObjectId;
	email: string;
	passwordHash: string;
}

type QuestionType = typeof questionTypes[number]
export type PublicUserData = Omit<IUser, 'passwordHash'>;

export type TimerValues = 'minutes' | 'seconds';
export type TimerLimit = Record<TimerValues, number>;

export type Quiz = {
	_id: Types.ObjectId;
	title: string;
	authorId: Types.ObjectId;
	createAt: Date;
	privacy: QuizPrivacyType;
	withTimer?: boolean;
	timerLimit?: TimerLimit;
}

export type Question = {
	_id: Types.ObjectId;
	description: string;
	quizId: Types.ObjectId;
	type: QuestionType; 
	isRequired: boolean;
	order: number; // question number
}

export type Answer = {
	_id: Types.ObjectId;
	value: string;
	isCorrect: boolean;
	order: number;
	questionId: Types.ObjectId;
};

export type CompletedQuiz = {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	quizId: Types.ObjectId;
	quizTitle: string;
	correct: number;
	incorrect: number;
	timeResult?: TimerLimit;
	date: string;
};

export type QuizRating = {
	_id: Types.ObjectId;
	authorId: Types.ObjectId;
	quizId: Types.ObjectId;
	rate: number;
};