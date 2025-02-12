import { FC, memo, useEffect } from 'react';
import { Heading, List } from '@chakra-ui/react';
import { CompletedQuizzesItem } from '../CompletedQuizzesItem/CompletedQizzesItem';
import { useCompletedQuizzes } from '../../model/store';
import { CompletedQuizzesSkeleton } from './CompletedQuizzesSkeleton';

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

	return (
		<List display='flex' flexWrap='wrap' justifyContent='center'>
			{quizzes.length ? (
				quizzes.map((quiz) => (
					<CompletedQuizzesItem
						key={quiz._id}
						quiz={quiz}
					/>
				))
			) : (
				<Heading size='md' color='blue.400'>
					You have no completed quizzes
				</Heading>
			)}
		</List>
	);
});