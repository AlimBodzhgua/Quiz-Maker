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
