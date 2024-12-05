import { FC, useEffect } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { QuizTable } from 'components/QuizTable/QuizTable';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@/router/router';
import { useQuizzesStore } from 'store/quizzes';

const MainPage: FC = () => {
	const toggleSelect = useQuizzesStore((state) => state.toggleSelect);
	const isSelecting = useQuizzesStore((state) => state.isSelecting);
	const fullResetSelectState = useQuizzesStore((state) => state.fullResetSelectState);

	useEffect(() => {
		return () => {
			fullResetSelectState();
		}
	}, [])

	return (
		<Box w='80%' p='15px 0'>
			<Flex
				justify='space-between'
				align='center'
				p='2px 14px'
				mb='14px'
			>
				<Heading>My quizzes</Heading>
				<Flex gap='8px'>
					<Button size='sm' as={Link} to={AppRoutes.CREATE_QUIZ}>
						Create
					</Button>
					<Button
						size='sm'
						onClick={toggleSelect}
						colorScheme='cyan'
						color='white'
					>
						{isSelecting ? 'Done' : 'Select'}
					</Button>
				</Flex>
			</Flex>
			<QuizTable />
		</Box>
	);
};

export default MainPage;
