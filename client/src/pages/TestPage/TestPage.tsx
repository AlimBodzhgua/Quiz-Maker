import { FC, useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useTimer } from '@/hooks/useTimer';
import { useParams } from 'react-router-dom';
import { Page } from 'components/UI/Page/Page';
import { Timer } from 'components/UI/Timer/Timer';
import { useCurrentTest } from 'store/currentTest';
import { QuestionsList } from 'components/QuestionsList/QuestionsList';
import { getMathcedTimerProps } from '@/utils/utils';

const TestPage: FC = () => {
	const { id } = useParams<{ id?: string }>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const test = useCurrentTest((state) => state.test);
	const correctAnswers = useCurrentTest((state) => state.correctAnswers);
	const incorrectAnswers = useCurrentTest((state) => state.incorrectAnswers);
	const questions = useCurrentTest((state) => state.questions);
	const getCurrentTest = useCurrentTest((state) => state.getCurrentTest);
	const resetTestResult = useCurrentTest((state) => state.resetTestResult);
	const saveTestResult = useCurrentTest((state) => state.saveTestResult);
	const toast = useToast();
	
	const timerProps = getMathcedTimerProps(test?.timerLimit);
	const { minutes, seconds, start, pause } = useTimer(timerProps);
	const [isStarted, setIsStarted] = useState<boolean>(false);


	useEffect(() => {
		if (id) {
			getCurrentTest(id).then((test) => {
				if (!test?.withTimer) {
					setIsStarted(true);
				}
			});
		}

		return () => resetTestResult();
	}, []);

	const handleStart = () => {
		setIsStarted(true);
		start();
	}

	const onFinish = () => {
		const answeredQuestionsAmount = correctAnswers + incorrectAnswers;
		pause();

		if (answeredQuestionsAmount === questions?.length) {
			setIsLoading(true);
			saveTestResult().then(() => setIsLoading(false));
		} else {
			toast({
				title: 'You haven\'t answered all the questions.',
				description: `To complete the test you need to answer all ${questions?.length} questions.`,
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
				position='relative'
			>
					<Heading size='lg' fontWeight='medium' color='white'>
						{test?.title}
					</Heading>
				<Flex justifyContent='space-between'>
					<Text fontWeight='bold' color='white'>
						Total quesetions: {questions?.length}
					</Text>
					{(test && test.withTimer) && <Timer minutes={minutes} seconds={seconds} />}
				</Flex>
				{(test && test.withTimer) &&
					<Button
						size='sm'
						onClick={handleStart}
						borderRadius='md'
						m='5px 0'
					>
						Start test 
					</Button>
				}
				<QuestionsList isBlured={isStarted} />
				<Flex gap='16px'>
					<Button
						onClick={onFinish}
						isLoading={isLoading}
						colorScheme='cyan'
						color='white'
						size='lg'
					>
						Finish Test
					</Button>
					<Flex alignItems='center' gap='12px' color='white'>
						<Text>{correctAnswers}</Text>
						<StarIcon />
					</Flex>
				</Flex>
			</Box>
		</Page>
	);
};

export default TestPage;
