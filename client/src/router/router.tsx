import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage/LoginPage.async';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage.async';
import { MainPage } from 'pages/MainPage/MainPage.async';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';

export enum AppRoutes {
	MAIN = '/',
	LOGIN = '/login',
	REGISTER = '/register',

	NOT_FOUND = '*',
}

export const router = createBrowserRouter([
	{
		path: AppRoutes.MAIN,
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
		path: AppRoutes.NOT_FOUND,
		element: <NotFoundPage />,
	},
]);