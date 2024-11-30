import { FC, useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useTimer } from '@/hooks/useTimer';
import { Page } from 'components/UI/Page/Page';
import { QuestionsList } from 'components/QuestionsList/QuestionsList';
import { QuizInfo } from 'components/QuizInfo/QuizInfo';
import { calculatePassedTime, getMathcedTimerProps } from '@/utils/utils';
import { useCurrentQuiz } from 'store/currentQuiz';
import { useLocation, useParams } from 'react-router-dom';

const QuizPage: FC = () => {
	const { id } = useParams<{ id?: string }>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const quiz = useCurrentQuiz((state) => state.quiz);
	const correctAnswers = useCurrentQuiz((state) => state.correctAnswers);
	const incorrectAnswers = useCurrentQuiz((state) => state.incorrectAnswers);
	const questions = useCurrentQuiz((state) => state.questions);
	const getCurrentQuiz = useCurrentQuiz((state) => state.getCurrentQuiz);
	const resetQuizResult = useCurrentQuiz((state) => state.resetQuizResult);
	const saveQuizResult = useCurrentQuiz((state) => state.saveQuizResult);
	const toast = useToast();
	
	const timerProps = getMathcedTimerProps(quiz?.timerLimit);
	const { minutes, seconds, start, pause } = useTimer(timerProps);
	const [isStarted, setIsStarted] = useState<boolean>(false);

	const location = useLocation();
	const [isPreview, setIsPreview] = useState<boolean>(false);

	useEffect(() => {
		if (id) {
			const { hash } = location;

			if (hash === '#PREVIEW') {
				setIsPreview(true);
			}

			getCurrentQuiz(id);
		}

		return () => resetQuizResult();
	}, []);

	const handleStart = () => {
		setIsStarted(true);
		start();
	};

	const onFinish = () => {
		const answeredQuestionsAmount = correctAnswers + incorrectAnswers;
		pause();

		if (answeredQuestionsAmount === questions?.length) {
			setIsLoading(true);
			let timeResult;

			if (quiz?.withTimer) {
				if (quiz.timerLimit) {
					timeResult = calculatePassedTime(quiz.timerLimit, minutes, seconds);
				} else {
					timeResult = { minutes, seconds };
				}
			}

			saveQuizResult(timeResult).then(() => setIsLoading(false));
		} else {
			toast({
				title: 'You haven\'t answered all the questions.',
				description: `To complete the quiz you need to answer all ${questions?.length} questions.`,
				status: 'error',
				position: 'top',
				duration: 5000,
				isClosable: true,
			});
		}
	}

	return (
		<Page>
			<Box
				w='75%'
				m='20px 0'
				p='20px'
				bg='linear-gradient(#0E6FE4, #0447CC)'
				borderRadius='base'
				boxShadow='base'
			>
				<Heading size='lg' fontWeight='medium' color='white'>
					{quiz?.title}
				</Heading>

				<QuizInfo isTimerStarted={isStarted}/>

				{quiz && quiz.withTimer && (
					<Button size='sm' onClick={handleStart} borderRadius='md' m='5px 0'>
						Start quiz
					</Button>
				)}
				<QuestionsList isBlured={isStarted} />
				{!isPreview && (
					<Flex gap='16px'>
						<Button
							onClick={onFinish}
							isLoading={isLoading}
							colorScheme='cyan'
							color='white'
							size='lg'
						>
							Finish Quiz
						</Button>
						<Flex alignItems='center' gap='12px' color='white'>
							<Text>{correctAnswers}</Text>
							<StarIcon />
						</Flex>
					</Flex>
				)}
			</Box>
		</Page>
	);
};

export default QuizPage;
