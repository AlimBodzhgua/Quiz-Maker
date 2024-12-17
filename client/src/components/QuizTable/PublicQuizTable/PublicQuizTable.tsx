import { FC, memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { useQuizzesStore } from 'store/quizzes';
import { SortDirectionType, SortFieldType } from 'types/sort';
import { sortQuizzes } from '@/utils/utils';
import { QuizItem } from './QuizItem';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableSkeleton } from '../TableSkeleton';


export const PublicQuizTable: FC = memo(() => {
	const sortedAndFilteredQuizzes = useQuizzesStore((state) => state.sortedAndFilteredQuizzes);
	const isLoading = useQuizzesStore((state) => state.isLoading);
	const getPublicQuizzes = useQuizzesStore((state) => state.getPublicQuizzes);
	const setSortedAndFilteredQuizzes = useQuizzesStore((state) => state.setSortedAndFilteredQuizzes);
	const [searchParams, _] = useSearchParams();

	useEffect(() => {
		getPublicQuizzes().then((data) => {
			if (searchParams.has('field') || searchParams.has('sort')) {
				const sortValue = searchParams.get('field') as SortFieldType || 'date';
				const sortDirection = searchParams.get('sort') as SortDirectionType;
				const sortedQuizzes = sortQuizzes(data, sortValue, sortDirection);
				setSortedAndFilteredQuizzes(sortedQuizzes);
			}
		});
	}, []);


	if (isLoading) {
		return <TableSkeleton />
	}
	
	return (
		<TableContainer
			border='1px solid black'
			borderRadius='12px'
			borderColor='#E2E8F0'
			mt='25px'
		>
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