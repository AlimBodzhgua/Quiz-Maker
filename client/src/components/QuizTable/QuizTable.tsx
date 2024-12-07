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
import { sortQuizzes } from '@/utils/utils';
import { SortDirectionType, SortFieldType } from 'types/sort';
import { TableSkeleton } from './TableSkeleton';
import { TableHeader } from './TableHeader';
import { useSearchParams } from 'react-router-dom';

export const QuizTable: FC = memo(() => {
	const sortedQuizzes = useQuizzesStore((state) => state.sortedQuizzes);
	const getQuizzes = useQuizzesStore((state) => state.getQuizzes);
	const isLoading = useQuizzesStore((state) => state.isLoading);
	const setSortedQuizzes = useQuizzesStore((state) => state.setSortedQuizzes);
	const [searchParams, _] = useSearchParams();

	useEffect(() => {
		getQuizzes().then((data) => {
			if (searchParams.has('field') || searchParams.has('sort')) {
				const sortValue = searchParams.get('field') as SortFieldType || 'date';
				const sortDirection = searchParams.get('sort') as SortDirectionType;
				const sortedQuizzes = sortQuizzes(data, sortValue, sortDirection);
				setSortedQuizzes(sortedQuizzes)
			}
		});
	}, []);

	if (isLoading) {
		return <TableSkeleton />
	}

	if (!sortedQuizzes.length) {
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
					{sortedQuizzes.map((quiz) => (
						<QuizItem quiz={quiz} key={quiz._id} />
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
});
