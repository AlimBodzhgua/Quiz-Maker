import { FC, Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from "src/router/router";
import { ChakraProvider } from '@chakra-ui/react'
import { useUserStore } from './store/user';

export const App: FC = () => {
	const initUser = useUserStore((state) => state.initUser);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			initUser();
		}
	}, [])

	return (
		<ChakraProvider>
			<Suspense fallback={<h1>Loading...</h1>}>
				<RouterProvider router={router} />
			</Suspense>
		</ChakraProvider>
	);
}
