import { FC, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, useToast, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { getQueryParam } from 'shared/utils';
import { QUIZ_LOCALSTORAGE_KEY } from 'shared/constants';
import { Page } from 'widgets/Page';
import { CreateQuizForm } from 'features/CreateQuiz';
import { useCreateQuiz } from 'features/CreateQuiz';
import { AddQuestionFormList } from 'features/CreateQuiz';
import { SettingsModal } from 'features/ManageQuizSetting';
import { useQuizzesStore } from 'entities/Quiz';

const CreateQuizPage: FC = () => {
	const toast = useToast();
	const navigate = useNavigate();

	const savedQuestionsAmount = useCreateQuiz((state) => state.savedQuestionsAmount);
	const quizId = useCreateQuiz((state) => state.quizId);
	const questions = useCreateQuiz((state) => state.questions);
	const resetQuiz = useCreateQuiz((state) => state.resetQuiz);
	const addQuestion = useCreateQuiz((state) => state.addQuestion);

	const removeQuiz = useQuizzesStore((state) => state.removeQuiz);

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
		navigate('/user-quizzes');
	};

	return (
		<Page>
			<Heading m='20px 0' fontWeight='normal' color='blue.400'>
				Create a new quiz
			</Heading>
			<Box
				display='flex'
				flexDirection='column'
				gap='10px'
				border='1px'
				borderColor='blue.400'
				borderRadius='12px'
				w='70%'
				p='20px'
			>
				<CreateQuizForm
					renderQuizSettingsManager={(params) => <SettingsModal {...params}/>}
				/>

				{!!questions.length && <AddQuestionFormList />}

				<Button
					onClick={onAddQuestion}
					size='lg'
					bgColor='#e6007e'
					color='white'
					m='8px 0'
					textTransform='uppercase'
					bgImage='linear-gradient(to right, #ff512f 0%, #dd2476 51%, #ff512f 100%)'
					_hover={{}}
					_active={{}}
				>
					+ Add Question
				</Button>
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
