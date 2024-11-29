import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage/LoginPage.async';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage.async';
import { MainPage } from 'pages/MainPage/MainPage.async';
import { CreateQuizPage } from 'pages/CreateQuizPage/CreateQuizPage.async';
import { QuizPage } from 'pages/QuizPage/QuizPage.async';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { CompletedQuizzesPage } from 'pages/CompletedQuizzesPage/CompletedQuizzesPage.async';
import { Layout } from 'components/UI/Layout/Layout';

export enum AppRoutes {
	MAIN = '/',
	LOGIN = '/login',
	REGISTER = '/register',
	CREATE_QUIZ = '/createQuiz',
	QUIZ = '/quiz/:id',
	COMPLETED_QUIZZES = '/quizzes/completed',

	NOT_FOUND = '*',
}

export const getQuizPage = (id: string) => `/quiz/${id}`;

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: AppRoutes.LOGIN,
				element: <LoginPage />,
			},
			{
				path: AppRoutes.REGISTER,
				element: <RegisterPage />,
			},
			{
				path: AppRoutes.CREATE_QUIZ,
				element: <CreateQuizPage />,
			},
			{
				path: AppRoutes.QUIZ,
				element: <QuizPage />,
			},
			{
				path: AppRoutes.COMPLETED_QUIZZES,
				element: <CompletedQuizzesPage />,
			},

			{
				path: AppRoutes.NOT_FOUND,
				element: <NotFoundPage />,
			},
		],
	},
]);
