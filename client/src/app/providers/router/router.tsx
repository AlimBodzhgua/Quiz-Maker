import { createBrowserRouter, replace } from 'react-router-dom';
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
import { AuthRequire, ProtectedFromAuthtorized } from '../../../features/Auth';
import { Layout } from '../../Layout/Layout';


export const routes: AppRouteObject[] = [
	{
		path: AppRoutes.LOGIN,
		element: (
			<ProtectedFromAuthtorized>
				<LoginPage />
			</ProtectedFromAuthtorized>
		),
		authRequire: false,
	},
	{
		path: AppRoutes.REGISTER,
		element: (
			<ProtectedFromAuthtorized>
				<RegisterPage />
			</ProtectedFromAuthtorized>
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
		]
	},
]);
