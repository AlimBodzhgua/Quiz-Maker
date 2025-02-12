import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { LoginPage } from 'pages/LoginPage';
import { RegisterPage } from 'pages/RegisterPage';
import { CreateQuizPage } from 'pages/CreateQuizPage';
import { QuizPage } from 'pages/QuizPage';
import { CompletedQuizzesPage } from 'pages/CompletedQuizzesPage';
import { PublicQuizzesPage } from 'pages/PublicQuizzesPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { AppRoutes } from 'shared/constants/routes';
import { AppRouteObject } from './types';
import { AuthRequire } from './AuthRequire';
import { Layout } from '../../Layout/Layout';

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

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: routes.map((route) =>
			route.authRequire
				? { ...route, element: <AuthRequire>{route.element}</AuthRequire> }
				: route,
		),
	},
]);
