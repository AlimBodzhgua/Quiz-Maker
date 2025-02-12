import { FC, Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppLoader } from 'shared/UI';
import { useInitUser } from 'entities/User';
import { router } from './providers/router/router';


export const App: FC = () => {
	const { initUserAuth } = useInitUser();

	useEffect(() => {
		initUserAuth();
	}, [initUserAuth])

	return (
		<Suspense fallback={<AppLoader />}>
			<RouterProvider router={router} />
		</Suspense>
	);
};
