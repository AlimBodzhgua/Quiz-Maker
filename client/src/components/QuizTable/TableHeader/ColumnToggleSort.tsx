import { FC, memo, useState } from 'react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { sortDirection } from '@/constants/sort';
import { addQueryParam, sortQuizzes } from '@/utils/utils';
import { useQuizzesStore } from 'store/quizzes';
import { SortDirectionType, SortFieldType } from 'types/sort';

interface ColumnToggleSortProps {
	text: string;
	sortField: SortFieldType;
	activeField: SortFieldType | null;
	onChangeActiveField: (field: SortFieldType) => void;
}

export const ColumnToggleSort: FC<ColumnToggleSortProps> = memo((props) => {
	const { text, sortField, activeField, onChangeActiveField } = props;
	const [direction, setDirection] = useState<SortDirectionType>(sortDirection.desc);
	const setSortedAndFilteredQuizzes = useQuizzesStore((state) => state.setSortedAndFilteredQuizzes);
	const quizzes = useQuizzesStore((state) => state.quizzes);

	const onToggleSort = () => {
		const nextDirection = direction === sortDirection.asc ? sortDirection.desc : sortDirection.asc; 
		addQueryParam('field', sortField);
		addQueryParam('sort', direction);

		const sorted = sortQuizzes(quizzes, sortField, direction);

		setSortedAndFilteredQuizzes(sorted);
		setDirection(nextDirection);
		onChangeActiveField(sortField);
	}

	return (
		<Flex
			onClick={onToggleSort}
			role='button'
			userSelect='none'
			alignItems='center'
			gap='8px'
		>
			<Text>{text}</Text>
			{activeField === sortField &&
				<Flex flexDir='column' fontSize='xx-small'>
					{direction === 'asc' 
						? <TriangleUpIcon />
						: <TriangleDownIcon />
					}
				</Flex>
			}
		</Flex>
	)
})