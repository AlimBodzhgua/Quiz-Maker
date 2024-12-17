import { MainPage } from 'pages/MainPage/MainPage.async';
import { LoginPage } from 'pages/LoginPage/LoginPage.async';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage.async';
import { CompletedQuizzesPage } from 'pages/CompletedQuizzesPage/CompletedQuizzesPage.async';
import { CreateQuizPage } from 'pages/CreateQuizPage/CreateQuizPage.async';
import { QuizPage } from 'pages/QuizPage/QuizPage.async';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { PublicQuizzesPage } from 'pages/PublicQuizzesPage/PublicQuizzesPage.async';
import { AppRouteObject } from '@/types/route';

export enum AppRoutes {
	MAIN = '/',
	LOGIN = '/login',
	REGISTER = '/register',
	CREATE_QUIZ = '/create-quiz',
	QUIZ = '/quiz/:id',
	COMPLETED_QUIZZES = '/quizzes/completed',
	PUBLIC_QUIZZES = '/public-quizzes',

	NOT_FOUND = '*',
}

export const routes: AppRouteObject[] = [
	{
		path: AppRoutes.MAIN,
		element: <MainPage />,
		authRequire: true,
	},
	{
		path: AppRoutes.LOGIN,
		element: <LoginPage />,
		authRequire: false,
	},
	{
		path: AppRoutes.REGISTER,
		element: <RegisterPage />,
		authRequire: false,
	},
	{
		path: AppRoutes.CREATE_QUIZ,
		element: <CreateQuizPage />,
		authRequire: true,
	},
	{
		path: AppRoutes.QUIZ,
		element: <QuizPage />,
		authRequire: true,
	},
	{
		path: AppRoutes.COMPLETED_QUIZZES,
		element: <CompletedQuizzesPage />,
		authRequire: true,
	},
	{
		path: AppRoutes.PUBLIC_QUIZZES,
		element: <PublicQuizzesPage />,
		authRequire: false, 
	},
	{
		path: AppRoutes.NOT_FOUND,
		element: <NotFoundPage />,
		authRequire: false,
	},
];