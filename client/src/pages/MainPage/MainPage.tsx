import { FC } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { TestTable } from 'components/TestTable/TestTable';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@/router/router';

const MainPage: FC = () => {
	return (
		<Box w='80%' p='15px 0'>
			<Flex justify='space-between' align='center' p='2px 14px' mb='14px'>
				<Heading>My tests</Heading>
				<Button as={Link} to={AppRoutes.CREATE_TEST}>
					Create
				</Button>
			</Flex>
			<TestTable />
		</Box>
	);
};

export default MainPage;
