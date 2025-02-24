type PublicQuiz = {
	type: 'public' | 'publicProtected';
	password?: string; // publicProtected
}

type PrivateQuiz = {
	type: 'private';
	password: string;
}

type RestrictedUsersQuiz = {
	type: 'restrictedUsers';
	userIds: string[];
}

type LinkProtectedQuiz = {
	type: 'privateLink' | 'linkProtected',
	token: string;
	password?: string; // linkProtectedQuiz
}

export type QuizPrivacyType = PublicQuiz | PrivateQuiz | RestrictedUsersQuiz | LinkProtectedQuiz;