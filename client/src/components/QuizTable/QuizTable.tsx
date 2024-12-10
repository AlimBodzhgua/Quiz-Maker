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
import { useSearchParams } from 'react-router-dom';
import { sortQuizzes } from '@/utils/utils';
import { SortDirectionType, SortFieldType } from 'types/sort';
import { TableSkeleton } from './TableSkeleton';
import { TableHeader } from './TableHeader';
import { QuizItem } from './QuizItem';

export const QuizTable: FC = memo(() => {
	const sortedAndFilteredQuizzes = useQuizzesStore((state) => state.sortedAndFilteredQuizzes);
	const getQuizzes = useQuizzesStore((state) => state.getQuizzes);
	const isLoading = useQuizzesStore((state) => state.isLoading);
	const setSortedAndFilteredQuizzes = useQuizzesStore((state) => state.setSortedAndFilteredQuizzes);
	const [searchParams, _] = useSearchParams();

	useEffect(() => {
		getQuizzes().then((data) => {
			if (searchParams.has('field') || searchParams.has('sort')) {
				const sortValue = searchParams.get('field') as SortFieldType || 'date';
				const sortDirection = searchParams.get('sort') as SortDirectionType;
				const sortedQuizzes = sortQuizzes(data, sortValue, sortDirection);
				setSortedAndFilteredQuizzes(sortedQuizzes)
			}
		});
	}, []);

	if (isLoading) {
		return <TableSkeleton />
	}

	if (!sortedAndFilteredQuizzes.length) {
		return (
			<Card align='center'>
				<CardBody>
					<Heading size='md'>You have not quizzes yet</Heading>
				</CardBody>
			</Card>
		);
	}

	return (
		<TableContainer border='1px solid black' borderRadius='12px' borderColor='#E2E8F0'>
			<Table>
				<TableHeader />
				<Tbody>
					{sortedAndFilteredQuizzes.map((quiz) => (
						<QuizItem quiz={quiz} key={quiz._id} />
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
});
