import { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Collapse, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { Page } from 'widgets/Page';
import { QuizHeader, QuestionsList, QuizResult, useCurrentQuiz } from 'entities/Quiz';
import { useTimer } from 'shared/lib/hooks';
import { FinishQuizButton } from 'features/SaveQuizResult';
import { useUserStore } from 'entities/User';
import { QuizRating } from 'features/RateQuiz';
import { NoPrint } from 'shared/lib/components/NoPrint';
import { getMathcedTimerProps } from '../lib/getMathcedTimerProps';

const QuizPage: FC = () => {
	const { id } = useParams<{ id?: string }>();
	const { isOpen, onToggle } = useDisclosure()
	const user = useUserStore((state) => state.user);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [isPreview, setIsPreview] = useState<boolean>(false);
	const getCurrentQuiz = useCurrentQuiz((state) => state.getCurrentQuiz);
	const resetQuizResult = useCurrentQuiz((state) => state.resetQuizResult);
	const correctAnswers = useCurrentQuiz((state) => state.correctAnswers);
	const quizTitle = useCurrentQuiz((state) => state.quiz?.title);
	const withTimer = useCurrentQuiz((state) => state.quiz)?.withTimer || false;
	const timerLimit = useCurrentQuiz((state) => state.quiz?.timerLimit);
	const location = useLocation();
	
	const timerProps = getMathcedTimerProps(timerLimit);
	const { minutes, seconds, start, pause } = useTimer(timerProps);
	
	const initQuiz = async (id: string) => {
		const quiz = await getCurrentQuiz(id);

		if (!quiz?.withTimer) {
			setIsStarted(true);
		}
	};

	useEffect(() => {
		const { hash } = location;

		if (hash === '#PREVIEW') {
			setIsPreview(true);
		}

		initQuiz(id!);

		return () => resetQuizResult();
	}, []);

	const handleStart = () => {
		setIsStarted(true);
		start();
	};

	const handleFinish = useCallback(() => {
		pause();
		onToggle();
	}, [pause, onToggle]);

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
				<NoPrint>
					<Heading size='lg' fontWeight='medium' color='white'>
						{quizTitle}
					</Heading>

					<QuizHeader isTimerStarted={isStarted} minutes={minutes} seconds={seconds}  />
					
					{withTimer && (
						<Button
							onClick={handleStart}
							borderRadius='md'
							size='sm'
							m='5px 0'
						>
							Start quiz
						</Button>
					)}

					<QuestionsList isBlured={isStarted} />
				</NoPrint>

				{!isPreview && !isOpen && (
					<Flex gap='16px' mb='16px'>
						<FinishQuizButton
							minutes={minutes}
							seconds={seconds}
							onFinish={handleFinish}
						/>
						<Flex alignItems='center' gap='12px' color='white'>
							<Text>{correctAnswers}</Text>
							<StarIcon />
						</Flex>
					</Flex>
				)}
				{user && (
					<Collapse in={isOpen} animateOpacity>
						<QuizResult
							userId={user?._id}
							userEmail={user?.email}
							renderQuizRating={(params) => <QuizRating {...params}/>}
						/>
					</Collapse>
				)}
			</Box>
		</Page>
	);
};

export default QuizPage;
