import { FC, useEffect, useState } from 'react';
import { Box, Button, Heading, Text, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Page } from 'components/UI/Page/Page';
import { useCurrentTest } from 'store/currentTest';
import { QuestionsList } from 'components/QuestionsList/QuestionsList';

const TestPage: FC = () => {
	const { id } = useParams<{ id?: string }>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const getCurrentTest = useCurrentTest((state) => state.getCurrentTest);
	const resetTestResult = useCurrentTest((state) => state.resetTestResult);
	const saveTestResult = useCurrentTest((state) => state.saveTestResult);
	const test = useCurrentTest((state) => state.test);
	const correctAnswers = useCurrentTest((state) => state.correctAnswers);
	const incorrectAnswers = useCurrentTest((state) => state.incorrectAnswers);
	const questions = useCurrentTest((state) => state.questions);
	const toast = useToast();

	useEffect(() => {
		if (id) {
			getCurrentTest(id);
		}

		return () =>  resetTestResult();
	}, []);

	const onFinish = () => {
		const answeredQuestionsAmount = correctAnswers + incorrectAnswers;

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
			>
				<Heading size='lg' fontWeight='medium' color='white'>
					{test?.title}
				</Heading>
				<Text fontWeight='bold' color='white'>Total quesetions: {questions?.length}</Text>
				<QuestionsList />
				<Button
					onClick={onFinish}
					isLoading={isLoading}
					colorScheme='cyan'
					color='white'
					display='flex'
					size='lg'
				>
					Finish Test
				</Button>
			</Box>
		</Page>
	);
};

export default TestPage;
