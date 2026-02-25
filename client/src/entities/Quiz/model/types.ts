import type { PrivacyValues, QuestionTypes, sortDirection, sortField } from 'shared/constants';

type TimerValues = 'minutes' | 'seconds';
export type TimerLimit = Record<TimerValues, number>;
export type QuestionType = keyof typeof QuestionTypes;
export type PrivacyTypeValue = keyof typeof PrivacyValues;

type PublicQuiz = {
	type: 'public' | 'publicProtected';
	password?: string; // publicProtected
};

type PrivateQuiz = {
	type: 'private';
};

type RestrictedUsersQuiz = {
	type: 'restrictedUsers';
	userIds: string[];
};

type LinkProtectedQuiz = {
	type: 'privateLink' | 'linkProtected';
	token: string;
	password?: string; // linkProtectedQuiz
};

export type PrivacyType = PublicQuiz | PrivateQuiz | RestrictedUsersQuiz | LinkProtectedQuiz;

export type Quiz = {
	_id: string;
	title: string;
	authorId: string;
	createdAt: string;
	privacy: PrivacyType;
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
	isRequired: boolean;
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
export type QuestionForm = Pick<Question, '_id' | 'order' | 'description'>;

export type SortFieldType = keyof typeof sortField;
export type SortDirectionType = keyof typeof sortDirection;
