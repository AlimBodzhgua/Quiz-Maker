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
	testId: String;
	type: QuestionType; 
	order: number; // question number
}

export interface IAnswer {
	_id: string;
	value: string;
	isCorrect: boolean;
	questionId: String;
}

export type IAnswerForm = Omit<IAnswer, 'questionId'>;