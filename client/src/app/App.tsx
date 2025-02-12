import { FC, Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppLoader } from 'shared/UI/AppLoader/AppLoader';
import { useInitUser } from 'entities/User';
import { router } from './providers/router/router';


export const App: FC = () => {
	const { initUserAuth } = useInitUser();

	useEffect(() => {
		// const token = localStorage.getItem('authToken');

		// if (token) {
		// 	initUser();
		// }
		initUserAuth();
	}, [initUserAuth])

	return (
		<Suspense fallback={<AppLoader />}>
			<RouterProvider router={router} />
		</Suspense>
	);
};
