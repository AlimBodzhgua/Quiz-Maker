import type { FC, ReactNode } from 'react';
import type { Quiz } from '../../model/types';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Card,
	CardBody,
	Flex,
	Heading,
	Table,
	TableContainer,
	Tbody,
} from '@chakra-ui/react';
import { memo } from 'react';
import BoxIcon from '../../assets/box.svg';
import { TableSkeleton } from './TableSkeleton';

interface QuizTableProps {
	header: ReactNode;
	quizzes: Quiz[];
	isLoading: boolean;
	haveError: boolean;
	renderQuizRow: (quiz: Quiz) => ReactNode;
}

export const QuizTable: FC<QuizTableProps> = memo((props) => {
	const {
		quizzes,
		header,
		isLoading,
		haveError,
		renderQuizRow,
	} = props;

	if (isLoading) {
		return <TableSkeleton />;
	}

	if (haveError) {
		return (
			<Alert status='error' variant='left-accent'>
				<Flex direction='column'>
					<Flex>
						<AlertIcon />
						<AlertTitle>Error fetching quizzes!</AlertTitle>
					</Flex>
					<AlertDescription p='0 32px'>
						Something went wrong trying to fetch quizzes data. Reload the page or try it later.
					</AlertDescription>
				</Flex>
			</Alert>
		);
	}

	if (!quizzes.length) {
		return (
			<Card align='center'>
				<CardBody
					display='flex'
					justifyContent='center'
					alignItems='center'
					flexDirection='column'
				>
					<BoxIcon />
					<Heading
						size='md'
						fontWeight='medium'
						color='gray.400'
					>
						No Quizzes
					</Heading>
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
