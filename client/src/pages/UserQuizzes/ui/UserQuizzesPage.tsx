import type { FC } from 'react';

import { Button, Flex } from '@chakra-ui/react';
import { useQuizzesStore, UserQuizzesTable } from 'entities/Quiz';
import { useUserStore } from 'entities/User';
import { SearchBar } from 'features/SearchQuizzes';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'shared/constants';
import { Page } from 'widgets/Page';

const UserQuizzesPage: FC = () => {
	const { t } = useTranslation();
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
		<Page>
			<Flex
				justify='space-between'
				align='center'
				p='2px 0px'
				my='15px'
				w='80%'
			>
				<Flex w='80%'>
					<SearchBar />
				</Flex>
				<Flex gap='8px'>
					<Button size='sm' as={Link} to={AppRoutes.CREATE_QUIZ}>
						{t('Create')}
					</Button>
					<Button
						size='sm'
						onClick={toggleSelect}
						disabled={!quizzes.length}
						colorScheme='cyan'
						color='white'
					>
						{isSelecting ? t('Done') : t('Select')}
					</Button>
				</Flex>
			</Flex>
			<UserQuizzesTable userId={userId!} />
		</Page>
	);
};

export default UserQuizzesPage;
