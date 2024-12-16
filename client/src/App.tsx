import { FC, Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { router } from '@/router/router';
import { useUserStore } from 'store/user';
import { AppLoader } from 'components/UI/AppLoader/AppLoader';


export const App: FC = () => {
	const initUser = useUserStore((state) => state.initUser);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			initUser();
		}
	}, [initUser]);

	return (
		<ChakraProvider>
			<Suspense fallback={<AppLoader />}>
				<RouterProvider router={router} />
			</Suspense>
		</ChakraProvider>
	);
};
