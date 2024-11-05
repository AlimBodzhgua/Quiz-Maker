export interface IUser {
	_id: string;
	token: string;
	email: string;
}

export interface ITest {
	_id: string;
	title: string;
	authorId: string;
	createdAt: string;
}

export type QuestionType = 'multipleAnswer' | 'oneAnswer' | 'inputAnswer' | 'trueOrFalse' // checkbox/radioButton/input

export interface IQuestion {
	_id: string;
	description: string;
	testId: string;
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

export type IAnswerForm = Omit<IAnswer, 'questionId'>;
export type IQuestionForm = Pick<IQuestion, '_id' | 'order'>;