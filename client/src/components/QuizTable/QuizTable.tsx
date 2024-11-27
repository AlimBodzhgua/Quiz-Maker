import { FC, memo, useEffect } from 'react';
import { Card, CardBody, Heading, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuizzesStore } from 'store/quizzes';
import { QuizItem } from './QuizItem';
import { TableSkeleton } from './TableSkeleton';

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
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Date Created</Th>
						<Th isNumeric>Number of participants</Th>
						<Th>Action</Th>
					</Tr>
				</Thead>
				<Tbody>
					{quizzes.map((quiz) => (
						<QuizItem quizItem={quiz} key={quiz._id} />
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
});
