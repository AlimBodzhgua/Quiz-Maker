import type { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useQuizzesStore, UserQuizzesTable } from 'entities/Quiz';
import { useUserStore } from 'entities/User';
import { SearchBar } from 'features/SearchQuizzes';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from 'shared/constants';

const UserQuizzesPage: FC = () => {
	const toggleSelect = useQuizzesStore((state) => state.toggleSelect);
	const isSelecting = useQuizzesStore((state) => state.isSelecting);
	const fullResetSelectState = useQuizzesStore((state) => state.fullResetSelectState);
	const quizzes = useQuizzesStore((state) => state.quizzes);
	const userId = useUserStore((state) => state.user?._id);

	useEffect(() => {
		return () => {
			fullResetSelectState();
		};
	}, []);

	return (
		<Flex
			w='80%'
			p='15px 0'
			direction='column'
			gap='14px'
		>
			<Flex
				justify='space-between'
				align='center'
				p='2px 0px'
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
			<UserQuizzesTable userId={userId!} />
		</Flex>
	);
};

export default UserQuizzesPage;
