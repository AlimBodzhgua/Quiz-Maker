import { FC, memo, ReactNode } from 'react';
import {
	Card,
	CardBody,
	Heading,
	Table,
	TableContainer,
	Tbody,
} from '@chakra-ui/react';
import { Quiz } from '../../model/types';
import { TableSkeleton } from './TableSkeleton';

interface QuizTableProps {
	header: ReactNode;
	quizzes: Quiz[];
	isLoading: boolean;
	renderQuizRow: (quiz: Quiz) => ReactNode;
}

export const QuizTable: FC<QuizTableProps> = memo((props) => {
	const {
		quizzes,
		header,
		isLoading,
		renderQuizRow,
	} = props;

	if (isLoading) {
		return <TableSkeleton />;
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
		<TableContainer border='1px solid black' borderRadius='12px' borderColor='#E2E8F0'>
			<Table>
				{header}
				<Tbody>{quizzes.map(renderQuizRow)}</Tbody>
			</Table>
		</TableContainer>
	);
});
