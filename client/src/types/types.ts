import { PrivacyValues } from '@/constants/privacy';
import { QuestionTypes } from '@/constants/questions';
import { TimerLimit } from './timer';

export interface IUser {
	_id: string;
	token: string;
	email: string;
}

export type IPublicUserData = Omit<IUser, 'token'>;

export interface IQuiz {
	_id: string;
	title: string;
	authorId: string;
	createdAt: string;
	privacy: QuizPrivacy;
	withTimer?: boolean;
	timerLimit?: TimerLimit;
}

export type QuestionType = keyof typeof QuestionTypes;
export type QuizPrivacy = keyof typeof PrivacyValues;

export interface IQuestion {
	_id: string;
	description: string;
	quizId: string;
	type: QuestionType;
	order: number;
}

export interface IAnswer {
	_id: string;
	value: string;
	order: number;
	isCorrect: boolean;
	questionId: string;
}

export interface ICompletedQuiz {
	_id: string;
	userId: string;
	quizId: string;
	quizTitle: string;
	correct: number;
	incorrect: number;
	timeResult?: TimerLimit;
	date: string;
}

export type IAnswerForm = Omit<IAnswer, 'questionId'>;
export type IQuestionForm = Pick<IQuestion, '_id' | 'order'>;