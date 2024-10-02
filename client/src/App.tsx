import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/router/router';

export const App: FC = () => {
	
	return (
		<RouterProvider router={router} />
	);
}
