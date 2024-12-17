import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useQuizzesStore } from '@/store/quizzes';
import { QuizItem } from './QuizItem';
import { SortToggle } from '../SortToggle/SortToggle';
import { sortField } from '@/constants/sort';
import { SortDirectionType, SortFieldType } from '@/types/sort';
import { sortQuizzes } from '@/utils/utils';
import { useSearchParams } from 'react-router-dom';


export const PublicQuizTable: FC = memo(() => {
	const sortedAndFilteredQuizzes = useQuizzesStore((state) => state.sortedAndFilteredQuizzes);
	const isLoading = useQuizzesStore((state) => state.isLoading);
	const getPublicQuizzes = useQuizzesStore((state) => state.getPublicQuizzes);
	const setSortedAndFilteredQuizzes = useQuizzesStore((state) => state.setSortedAndFilteredQuizzes);
	const [acitveField, setActiveField] = useState<SortFieldType | null>(null);
	const [searchParams, _] = useSearchParams();

	useEffect(() => {
		getPublicQuizzes().then((data) => {
			if (searchParams.has('field') || searchParams.has('sort')) {
				const sortValue = searchParams.get('field') as SortFieldType || 'date';
				const sortDirection = searchParams.get('sort') as SortDirectionType;
				const sortedQuizzes = sortQuizzes(data, sortValue, sortDirection);
				setSortedAndFilteredQuizzes(sortedQuizzes)
			}
		});
	}, []);

	const onChangeActiveField = useCallback((field: SortFieldType) => {
		setActiveField(field);
	}, []);

	if (isLoading) {
		return 'Loading...'
	}
	
	return (
		<TableContainer
			border='1px solid black'
			borderRadius='12px'
			borderColor='#E2E8F0'
			mt='25px'
		>
			<Table>
				<Thead>
					<Tr>
						<Th>
							<SortToggle
								text='Name'
								sortField={sortField.name}
								activeField={acitveField}
								onChangeActiveField={onChangeActiveField}
							/>
						</Th>
						<Th>
							<SortToggle
								text='Date'
								sortField={sortField.date}
								activeField={acitveField}
								onChangeActiveField={onChangeActiveField}
							/>
						</Th>
						<Th isNumeric>Questions</Th>
						<Th isNumeric>Number of Participiants</Th>
						<Th>Author</Th>
					</Tr>
				</Thead>
				<Tbody>
					{sortedAndFilteredQuizzes.map((quiz) => (
						<QuizItem quiz={quiz} key={quiz._id} />
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
});