import type { FC } from 'react';

import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/Header';

export const Layout: FC = () => {
	return (
		<Flex direction='column' align='center' h='100vh'>
			<Header />
			<Outlet />
		</Flex>
	);
};
