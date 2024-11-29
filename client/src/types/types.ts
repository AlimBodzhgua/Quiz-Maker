import { TimerLimit } from './timer';

export interface IUser {
	_id: string;
	token: string;
	email: string;
}

export interface IQuiz {
	_id: string;
	title: string;
	authorId: string;
	createdAt: string;
	withTimer?: boolean;
	timerLimit?: TimerLimit;
}

export type QuestionType = 'multipleAnswer' | 'oneAnswer' | 'inputAnswer' | 'trueOrFalse' // checkbox/radioButton/input

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
}

export type IAnswerForm = Omit<IAnswer, 'questionId'>;
export type IQuestionForm = Pick<IQuestion, '_id' | 'order'>;