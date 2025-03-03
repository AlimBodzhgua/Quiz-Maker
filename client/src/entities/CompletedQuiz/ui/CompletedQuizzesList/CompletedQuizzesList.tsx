import { FC, memo, useEffect } from 'react';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Card,
	CardBody,
	Flex,
	Heading,
	List,
} from '@chakra-ui/react';
import { CompletedQuizzesSkeleton } from './CompletedQuizzesSkeleton';
import { CompletedQuizzesItem } from '../CompletedQuizzesItem/CompletedQizzesItem';
import { useCompletedQuizzes } from '../../model/store';
import NoteIcon from '../../assets/note.svg';

export const CompletedQuizzesList: FC = memo(() => {
	const fetchCompletedQuizzes = useCompletedQuizzes((state) => state.fetchQuizzes);
	const quizzes = useCompletedQuizzes((state) => state.quizzes);
	const fetchStatus = useCompletedQuizzes((state) => state.fetchQuizzesStatus);
	const isLoading = fetchStatus === 'pending';
	const haveError = fetchStatus === 'failed';

	useEffect(() => {
		fetchCompletedQuizzes();
	}, []);

	if (isLoading) {
		return <CompletedQuizzesSkeleton />;
	}

	if (haveError) {
		return (
			<Alert status='error' maxW='75%' m='40px 0' variant='left-accent'>
				<Flex direction='column'>
					<Flex>
						<AlertIcon />
						<AlertTitle>Error fetching completed quizzes!</AlertTitle>
					</Flex>
					<AlertDescription p='0 32px'>
						Something went wrong trying to fetch quizzes data. Reload the page or try it later.
					</AlertDescription>
				</Flex>
			</Alert>
		)
	}

	if (!quizzes.length) {
		return (
			<Card align='center' mt='120px'>
				<CardBody
					display='flex'
					justifyContent='center'
					alignItems='center'
					flexDirection='column'
				>
					<NoteIcon />
					<Heading fontWeight='medium' size='md' mt='20px' color='gray.500'>
						You have no completed quizzes
					</Heading>
				</CardBody>
			</Card>
		);
	}

	return (
		<List display='flex' flexWrap='wrap' justifyContent='center'>
			{quizzes.map((quiz) => (
				<CompletedQuizzesItem key={quiz._id} quiz={quiz} />
			))}
		</List>
	);
});