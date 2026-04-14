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
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Timer } from 'shared/UI';
import { getQuizPage } from 'shared/utils';
import { useCompletedQuizzes } from '../../model/store';

interface CompletedQuizzesItemProps {
	quiz: CompletedQuiz;
}

export const CompletedQuizzesItem: FC<CompletedQuizzesItemProps> = memo(({ quiz }) => {
	const { t } = useTranslation();
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
			<Card w='100%' bgColor='bg.secondary'>
				<CardHeader pb='0'>
					<Heading size='md'>{quiz.quizTitle}</Heading>
				</CardHeader>
				<CardBody>
					<Flex alignItems='center' justifyContent='space-between'>
						<Heading size='sm'>
							{t('completed_quiz.total_questions')}
							:
						</Heading>
						<Text>{quiz.correct + quiz.incorrect}</Text>
					</Flex>
					<Divider />
					<Flex m='5px 0' alignItems='center' justifyContent='space-between'>
						<Heading size='sm'>
							{t('completed_quiz.title')}
							:
						</Heading>
						<Flex flexDirection='column' textAlign='end'>
							<Text color='green.400'>
								{t('completed_quiz.correct')}
								:
								{quiz.correct}
							</Text>
							<Text color='red.400'>
								{t('completed_quiz.incorrect')}
								:
								{quiz.incorrect}
							</Text>
						</Flex>
					</Flex>
					<Divider />
					{quiz.timeResult && (
						<Flex m='5px 0' alignItems='center' justifyContent='space-between'>
							<Heading size='sm' mr='32px'>
								{t('completed_quiz.result')}
								:
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
					<Flex direction='column' w='100%' gap='12px'>
						<Text alignSelf='end'>{quiz.date}</Text>
						<Flex w='100%' gap='12px'>
							<Button
								size='sm'
								color='white'
								bg='cyan.500'
								w='50%'
								_hover={{ backgroundColor: 'cyan.600' }}
								gap='6px'
								as={RouterLink}
								to={getQuizPage(quiz.quizId)}
							>
								<Text whiteSpace='collapse'>{t('completed_quiz.try_again')}</Text>
								<RepeatIcon />
							</Button>
							<Button
									size='sm'
									color='white'
									bg='red.500'
									w='50%'
									gap='6px'
									onClick={handleRemove}
									_hover={{ backgroundColor: 'red.600' }}
								>
									<Text>{t('buttons.delete')}</Text>
									<DeleteIcon />
								</Button>
						</Flex>
					</Flex>
				</CardFooter>
			</Card>
		</ListItem>
	);
});
