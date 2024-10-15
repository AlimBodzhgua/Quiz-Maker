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

export type QuestionType = 'multipleAnswer' | 'oneAnswer' | 'inputAnswer' // checkbox/radioButton/input

export interface IQuestion {
	_id: String;
	description: string;
	testId: String;
	type: QuestionType; 
	order: number; // question number
}

export interface IAnswer {
	_id: String;
	value: string;
	isCorrect: boolean;
	questionId: String;
}