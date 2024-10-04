import { FC, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/router/router';
import { ChakraProvider } from '@chakra-ui/react'

export const App: FC = () => {
	return (
		<ChakraProvider>
			<Suspense fallback={<h1>Loading...</h1>}>
				<RouterProvider router={router} />
			</Suspense>
		</ChakraProvider>
	);
}
