import type { FC } from 'react';
import { useInitUser } from 'entities/User';
import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppLoader } from 'shared/UI';
import { router } from './providers/router/router';
import 'shared/config/i18n';

export const App: FC = () => {
	const { initUserAuth } = useInitUser();

	useEffect(() => {
		initUserAuth();
	}, [initUserAuth]);

	return (
		<Suspense fallback={<AppLoader />}>
			<RouterProvider router={router} />
		</Suspense>
	);
};
