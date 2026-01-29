export enum AppRoutes {
	LOGIN = '/login',
	REGISTER = '/register',

	QUIZ = '/quiz/:id',
	CREATE_QUIZ = '/create-quiz',
	USER_QUIZZES = '/user-quizzes',
	COMPLETED_QUIZZES = '/quizzes/completed',
	PUBLIC_QUIZZES = '/public-quizzes',
	PROFILE = '/profile',

	NOT_FOUND = '*',
}
