import { createBrowserRouter } from 'react-router-dom';
import { Layout } from 'components/UI/Layout/Layout';
import { AuthRequire } from './AuthRequire';
import { routes } from './routes';

export const getQuizPage = (id: string) => `/quiz/${id}`;

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
