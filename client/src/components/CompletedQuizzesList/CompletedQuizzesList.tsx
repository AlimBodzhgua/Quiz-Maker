import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Heading, List, ListItem, Skeleton } from '@chakra-ui/react';
import { QuizService } from '@/services/QuizService';
import { ICompletedQuiz } from 'types/types';
import { CompletedQuizzesItem } from './CompletedQizzesItem';

export const CompletedQuizzesList: FC = memo(() => {
	const [quizzes, setQuizzes] = useState<ICompletedQuiz[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const initQuizzes = useCallback(async () => {
		setIsLoading(true);
		const quizzes = await QuizService.getCompletedQuizzes();
		setQuizzes(quizzes);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		initQuizzes();
	}, []);

	const onRemove = useCallback(async (quizId: string) => {
		await QuizService.removeCompletedQuize(quizId);
		setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
	}, [quizzes]);

	if (isLoading) {
		return (
			<List
				display='flex'
				flexWrap='wrap'
				justifyContent='center'
				gap='20px'
			>
				{Array(8).fill(0).map((_, index) => (
					<ListItem m='16px 0' key={index}>
						<Skeleton width='300px' height='195px'/>
					</ListItem>
				))}
			</List>
		);
	}

	return (
		<List
			display='flex'
			flexWrap='wrap'
			justifyContent='center'
		>
			{quizzes.length ? (
				quizzes.map((quiz) => (
					<CompletedQuizzesItem
						key={quiz._id}
						quiz={quiz}
						onRemove={onRemove}
					/>
				))
			) : (
				<Heading size='md' color='blue.400'>You have no completed quizzes</Heading>
			)}
		</List>
	);
});