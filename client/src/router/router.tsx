import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage/LoginPage.async';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage.async';
import { MainPage } from 'pages/MainPage/MainPage.async';
import { CreateTestPage } from 'pages/CreateTestPage/CreateTestPage.async';
import { TestPage } from 'pages/TestPage/TestPage.async';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { Layout } from 'components/UI/Layout/Layout';

export enum AppRoutes {
	MAIN = '/',
	LOGIN = '/login',
	REGISTER = '/register',
	CREATE_TEST = '/createTest',
	TEST = '/test/:id',

	NOT_FOUND = '*',
}

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
				path: AppRoutes.CREATE_TEST,
				element: <CreateTestPage />,
			},
			{
				path: AppRoutes.TEST,
				element: <TestPage />
			},
			{
				path: AppRoutes.NOT_FOUND,
				element: <NotFoundPage />,
			},
		],
	},
]);