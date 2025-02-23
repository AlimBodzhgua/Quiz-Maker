import { FC, memo, useEffect } from 'react';
import { Card, CardBody, Heading, List } from '@chakra-ui/react';
import { CompletedQuizzesSkeleton } from './CompletedQuizzesSkeleton';
import { CompletedQuizzesItem } from '../CompletedQuizzesItem/CompletedQizzesItem';
import { useCompletedQuizzes } from '../../model/store';
import NoteIcon from '../../assets/note.svg';

export const CompletedQuizzesList: FC = memo(() => {
	const fetchCompletedQuizzes = useCompletedQuizzes((state) => state.fetchQuizzes);
	const quizzes = useCompletedQuizzes((state) => state.quizzes);
	const fetchStatus = useCompletedQuizzes((state) => state.fetchQuizzesStatus);
	const isLoading = fetchStatus === 'pending';

	useEffect(() => {
		fetchCompletedQuizzes();
	}, []);


	if (isLoading) {
		return <CompletedQuizzesSkeleton />;
	}

	if (!quizzes.length) {
		return (
			<Card align='center' mt='120px'>
				<CardBody
					display='flex'
					justifyContent='center'
					alignItems='center'
					flexDirection='column'
				>
					<NoteIcon />
					<Heading fontWeight='medium' size='md' mt='20px' color='gray.500'>
						You have no completed quizzes
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