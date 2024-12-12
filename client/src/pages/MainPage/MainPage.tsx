import { FC, useEffect } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@/router/routes';
import { QuizTable } from 'components/QuizTable/QuizTable';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { useQuizzesStore } from 'store/quizzes';

const MainPage: FC = () => {
	const toggleSelect = useQuizzesStore((state) => state.toggleSelect);
	const isSelecting = useQuizzesStore((state) => state.isSelecting);
	const fullResetSelectState = useQuizzesStore((state) => state.fullResetSelectState);
	const quizzes = useQuizzesStore((state) => state.quizzes);

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
				p='2px 0px'
				mb='14px'
			>
				<Flex w='80%'>
					<SearchBar />
				</Flex>
				<Flex gap='8px'>
					<Button size='sm' as={Link} to={AppRoutes.CREATE_QUIZ}>
						Create
					</Button>
					<Button
						size='sm'
						onClick={toggleSelect}
						disabled={!quizzes.length}
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
