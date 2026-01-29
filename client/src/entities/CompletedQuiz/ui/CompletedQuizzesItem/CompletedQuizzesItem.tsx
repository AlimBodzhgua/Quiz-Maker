import type { FC } from 'react';
import type { CompletedQuiz } from '../../model/types';
import { DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Flex,
	Heading,
	ListItem,
	Text,
} from '@chakra-ui/react';
import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Timer } from 'shared/UI';
import { getQuizPage } from 'shared/utils';
import { useCompletedQuizzes } from '../../model/store';

interface CompletedQuizzesItemProps {
	quiz: CompletedQuiz;
}

export const CompletedQuizzesItem: FC<CompletedQuizzesItemProps> = memo(({ quiz }) => {
	const removeQuiz = useCompletedQuizzes((state) => state.removeQuiz);
	const removeStatus = useCompletedQuizzes((state) => state.fetchQuizzesStatus);
	const isLoading = removeStatus === 'pending';

	const handleRemove = () => {
		removeQuiz(quiz._id);
	};

	return (
		<ListItem
			m='18px 20px'
			minW='300px'
			opacity={isLoading ? 0.5 : 1}
			transition='transform .2s linear'
			_hover={{ transform: 'scale(1.03)' }}
		>
			<Card w='100%'>
				<CardHeader pb='0'>
					<Flex justifyContent='space-between' alignItems='center'>
						<Heading size='md'>{quiz.quizTitle}</Heading>
						<Button
							onClick={handleRemove}
							size='sm'
							variant='outline'
							_hover={{ color: 'red.400' }}
						>
							<DeleteIcon />
						</Button>
					</Flex>
				</CardHeader>
				<CardBody>
					<Flex alignItems='center' justifyContent='space-between'>
						<Heading size='sm'>Total Questions:</Heading>
						<Text>{quiz.correct + quiz.incorrect}</Text>
					</Flex>
					<Divider />
					<Flex m='5px 0' alignItems='center' justifyContent='space-between'>
						<Heading size='sm'>Test result:</Heading>
						<Flex flexDirection='column' textAlign='end'>
							<Text color='green.400'>
								Correct:
								{quiz.correct}
							</Text>
							<Text color='red.400'>
								Incorrect:
								{quiz.incorrect}
							</Text>
						</Flex>
					</Flex>
					<Divider />
					{quiz.timeResult && (
						<Flex m='5px 0' alignItems='center' justifyContent='space-between'>
							<Heading size='sm' mr='32px'>
								Time result:
							</Heading>
							<Timer
								minutes={quiz.timeResult.minutes}
								seconds={quiz.timeResult.seconds}
								color='black'
							/>
						</Flex>
					)}
					<Divider />
				</CardBody>
				<CardFooter pt='0' display='flex' justifyContent='space-between'>
					<Text>{quiz.date}</Text>
					<Button
						size='sm'
						colorScheme='cyan'
						color='white'
						gap='6px'
						as={RouterLink}
						to={getQuizPage(quiz.quizId)}
					>
						<Text>try again</Text>
						<RepeatIcon />
					</Button>
				</CardFooter>
			</Card>
		</ListItem>
	);
});
