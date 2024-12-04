import { FC, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, useToast, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { getQueryParam } from '@/utils/utils';
import { QUIZ_LOCALSTORAGE_KEY } from '@/constants/localStorage';
import { AddQuestionFormList } from 'components/AddQuestionFormList';
import { CreateQuizForm } from 'components/CreateQuizForm/CreateQuizForm';
import { Page } from 'components/UI/Page/Page';
import { useQuizzesStore } from 'store/quizzes';
import { useCreateQuiz } from 'store/createQuiz';

const CreateQuizPage: FC = () => {
	const quizId = useCreateQuiz((state) => state.quizId);
	const questions = useCreateQuiz((state) => state.questions);
	const savedQuestionsAmount = useCreateQuiz((state) => state.savedQuestionsAmount);
	const toast = useToast();
	const removeQuiz = useQuizzesStore((state) => state.removeQuiz);
	const resetQuiz = useCreateQuiz((state) => state.resetQuiz);
	const addQuestion = useCreateQuiz((state) => state.addQuestion);
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			const quizId = localStorage.getItem(QUIZ_LOCALSTORAGE_KEY);
			
			if (quizId) {
				window.history.pushState({}, document.title, window.location.pathname);
				removeQuiz(quizId);
				resetQuiz();
			}
		};
	}, []);

	const onAddQuestion = useCallback(() => {
		if (!quizId) {
			return toast({
				title: 'Quiz not created.',
				description: 'First you need to create a quiz and save it.',
				status: 'info',
				duration: 5000,
				isClosable: true,
				position: 'top-left'
			});
		}
		addQuestion();
	}, [quizId]);

	const onComplete = () => {
		resetQuiz();
		navigate('/');
	};

	return (
		<Page>
			<Heading m='12px 0'>Сreating a new quiz</Heading>
			<Box
				display='flex'
				flexDirection='column'
				gap='10px'
				border='1px'
				borderColor='blue.200'
				borderRadius='base'
				w='70%'
				p='20px'
			>
				<CreateQuizForm />

				{!!questions.length && <AddQuestionFormList />}

				<Button onClick={onAddQuestion}>+ Add Question</Button>
				<Flex alignSelf='flex-end' alignItems='center' gap='10px'>
					<Box>Questions: {savedQuestionsAmount}</Box>
					<Button
						as={Link}
						state={{ page: '#PREVIEW' }}
						to={`/quiz/${getQueryParam('id')}#PREVIEW`}
						disabled={savedQuestionsAmount === 0}
						pointerEvents={savedQuestionsAmount === 0 ? 'none' : 'all'}
						colorScheme='blue'
						target='_blank'
					>
						<ViewIcon mr='10px' />
						<Text>Preview</Text>
					</Button>
					<Button
						colorScheme='cyan'
						color='white'
						disabled={savedQuestionsAmount === 0}
						onClick={onComplete}
					>
						Complete
					</Button>
				</Flex>
			</Box>
		</Page>
	);
};

export default CreateQuizPage;
