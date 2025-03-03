import { createBrowserRouter } from 'react-router-dom';
import { UserQuizzesPage } from 'pages/UserQuizzes';
import { LoginPage } from 'pages/Login';
import { RegisterPage } from 'pages/Register';
import { CreateQuizPage } from 'pages/CreateQuiz';
import { QuizPage } from 'pages/Quiz';
import { ProfilePage } from 'pages/Profile';
import { CompletedQuizzesPage } from 'pages/CompletedQuizzes';
import { PublicQuizzesPage } from 'pages/PublicQuizzes';
import { NotFoundPage } from 'pages/NotFound';
import { AppRoutes } from 'shared/constants';
import { AppRouteObject } from './types';
import { AuthRequire } from './AuthRequire';
import { Layout } from '../../Layout/Layout';

export const routes: AppRouteObject[] = [
	{
		path: AppRoutes.USER_QUIZZES,
		element: <UserQuizzesPage />,
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
		path: AppRoutes.PROFILE,
		element: <ProfilePage />,
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
