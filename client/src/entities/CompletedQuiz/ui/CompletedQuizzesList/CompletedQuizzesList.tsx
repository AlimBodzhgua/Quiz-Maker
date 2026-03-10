import type { FC } from 'react';

import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Card,
	CardBody,
	Flex,
	Heading,
	List,
} from '@chakra-ui/react';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import NoteIcon from '../../assets/note.svg';
import { useCompletedQuizzes } from '../../model/store';
import { CompletedQuizzesItem } from '../CompletedQuizzesItem/CompletedQuizzesItem';
import { CompletedQuizzesSkeleton } from './CompletedQuizzesSkeleton';

export const CompletedQuizzesList: FC = memo(() => {
	const { t } = useTranslation();
	const fetchCompletedQuizzes = useCompletedQuizzes((state) => state.fetchQuizzes);
	const quizzes = useCompletedQuizzes((state) => state.quizzes);
	const fetchStatus = useCompletedQuizzes((state) => state.fetchQuizzesStatus);
	const isLoading = fetchStatus === 'pending';
	const haveError = fetchStatus === 'failed';

	useEffect(() => {
		fetchCompletedQuizzes();
	}, []);

	if (isLoading) {
		return <CompletedQuizzesSkeleton />;
	}

	if (haveError) {
		return (
			<Alert
				status='error'
				maxW='75%'
				m='40px 0'
				variant='left-accent'
			>
				<Flex direction='column'>
					<Flex>
						<AlertIcon />
						<AlertTitle>{t('errors.fetch_completed_quizzes')}</AlertTitle>
					</Flex>
					<AlertDescription p='0 32px'>
						{t('errors.fetch_quizzes')}
					</AlertDescription>
				</Flex>
			</Alert>
		);
	}

	if (!quizzes.length) {
		return (
			<Card align='center' mt='120px' bgColor='bg.secondary'>
				<CardBody
					display='flex'
					justifyContent='center'
					alignItems='center'
					flexDirection='column'
				>
					<NoteIcon />
					<Heading
						fontWeight='medium'
						size='md'
						mt='20px'
						color='#616161'
					>
						{t('completed_quiz.no_completed')}
					</Heading>
				</CardBody>
			</Card>
		);
	}

	return (
		<List display='flex' flexWrap='wrap' justifyContent='center'>
			{quizzes.map((quiz) => (
				<CompletedQuizzesItem key={quiz._id} quiz={quiz} />
			))}
		</List>
	);
});
