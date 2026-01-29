import type { AppRouteObject } from './types';
import { CompletedQuizzesPage } from 'pages/CompletedQuizzes';
import { CreateQuizPage } from 'pages/CreateQuiz';
import { LoginPage } from 'pages/Login';
import { NotFoundPage } from 'pages/NotFound';
import { ProfilePage } from 'pages/Profile';
import { PublicQuizzesPage } from 'pages/PublicQuizzes';
import { QuizPage } from 'pages/Quiz';
import { RegisterPage } from 'pages/Register';
import { UserQuizzesPage } from 'pages/UserQuizzes';
import { createBrowserRouter, replace } from 'react-router-dom';
import { AppRoutes } from 'shared/constants';
import { AuthRequire, ProtectedFromAuthorized } from '../../../features/Auth';
import { Layout } from '../../Layout/Layout';

export const routes: AppRouteObject[] = [
	{
		path: AppRoutes.LOGIN,
		element: (
			<ProtectedFromAuthorized>
				<LoginPage />
			</ProtectedFromAuthorized>
		),
		authRequire: false,
	},
	{
		path: AppRoutes.REGISTER,
		element: (
			<ProtectedFromAuthorized>
				<RegisterPage />
			</ProtectedFromAuthorized>
		),
		authRequire: false,
	},
	{
		path: AppRoutes.USER_QUIZZES,
		element: <UserQuizzesPage />,
		authRequire: true,
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
		authRequire: true,
	},
	{
		path: AppRoutes.PROFILE,
		element: <ProfilePage />,
		authRequire: true,
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
		children: [
			{
				index: true,
				loader: () => replace(AppRoutes.USER_QUIZZES),
			},
			...routes.map((route) =>
				route.authRequire
					? { ...route, element: <AuthRequire>{route.element}</AuthRequire> }
					: route,
			),
		],
	},
]);
