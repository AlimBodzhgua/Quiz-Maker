import { FC, memo, useEffect } from 'react';
import {
	Card,
	CardBody,
	Heading,
	Table,
	TableContainer,
	Tbody,
} from '@chakra-ui/react';
import { useQuizzesStore } from 'store/quizzes';
import { QuizItem } from './QuizItem';
import { TableSkeleton } from './TableSkeleton';
import { TableHeader } from './TableHeader';

export const QuizTable: FC = memo(() => {
	const quizzes = useQuizzesStore((state) => state.quizzes);
	const getQuizzes = useQuizzesStore((state) => state.getQuizzes);
	const isLoading = useQuizzesStore((state) => state.isLoading);

	useEffect(() => {
		getQuizzes();
	}, [getQuizzes]);
	
	if (isLoading) {
		return <TableSkeleton />
	}

	if (!quizzes.length) {
		return (
			<Card align='center'>
				<CardBody>
					<Heading size='md'>You have not quizzes yet</Heading>
				</CardBody>
			</Card>
		);
	}

	return (
		<TableContainer>
			<Table variant='simple' colorScheme='teal'>
				<TableHeader />
				<Tbody>
					{quizzes.map((quiz) => (
						<QuizItem quiz={quiz} key={quiz._id} />
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
});
