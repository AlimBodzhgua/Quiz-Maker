import { PrivacyValues } from 'shared/constants';
import { QuestionTypes } from 'shared/constants';
import { sortDirection, sortField } from 'shared/constants';


type TimerValues = 'minutes' | 'seconds';
export type TimerLimit = Record<TimerValues, number>;
export type QuestionType = keyof typeof QuestionTypes;

export type QuizPrivacy = keyof typeof PrivacyValues;

export type Quiz = {
	_id: string;
	title: string;
	authorId: string;
	createdAt: string;
	privacy: QuizPrivacy;
	withTimer?: boolean;
	timerLimit?: TimerLimit;
};

export type CompletedQuiz = {
	_id: string;
	userId: string;
	quizId: string;
	quizTitle: string;
	correct: number;
	incorrect: number;
	timeResult?: TimerLimit;
	date: string;
};

export type Question = {
	_id: string;
	description: string;
	quizId: string;
	type: QuestionType;
	order: number;
};

export type Answer = {
	_id: string;
	value: string;
	order: number;
	isCorrect: boolean;
	questionId: string;
};

export type PublicUserData = {
	_id: string;
	email: string;
};


export type AnswerForm = Omit<Answer, 'questionId'>;
export type QuestionForm = Pick<Question, '_id' | 'order'>;

export type SortFieldType = keyof typeof sortField;
export type SortDirectionType = keyof typeof sortDirection;