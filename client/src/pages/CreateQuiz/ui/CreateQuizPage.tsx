import type { FC } from 'react';

import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { useQuizzesStore } from 'entities/Quiz';
import {
	AddQuestionFormList,
	CreateQuizForm,
	SidebarQuestionsList,
	useCreateQuiz,
} from 'features/CreateQuiz';
import { SettingsModal } from 'features/ManageQuizSetting';
import { useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getQueryParam } from 'shared/utils';
import { Page } from 'widgets/Page';
import { useTranslation } from 'react-i18next';

const CreateQuizPage: FC = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const savedQuestionsAmount = useCreateQuiz((state) => state.savedQuestionsAmount);
	const quizId = useCreateQuiz((state) => state.quizId);
	const questions = useCreateQuiz((state) => state.questions);
	const resetQuizData = useCreateQuiz((state) => state.resetQuizData);
	const addQuestion = useCreateQuiz((state) => state.addQuestion);
	const removeQuiz = useQuizzesStore((state) => state.removeQuiz);
	const shouldDeleteQuizRef = useRef<boolean>(true);

	useEffect(() => {
		return () => {
			if (quizId && shouldDeleteQuizRef.current) {
				window.history.pushState({}, document.title, window.location.pathname);
				removeQuiz(quizId);
				resetQuizData();
			}
		};
	}, [quizId]);

	const onAddQuestion = useCallback(() => {
		if (!quizId) {
			return toast({
				title: 'Quiz not created.',
				description: 'First you need to create a quiz and save it.',
				status: 'info',
				duration: 5000,
				isClosable: true,
				position: 'top-left',
			});
		}
		addQuestion();
	}, [quizId]);

	const onComplete = () => {
		shouldDeleteQuizRef.current = false;
		resetQuizData();
		navigate('/user-quizzes');
	};

	return (
		<Page>
			<Flex width='100%' gap='12px' my='32px'>
				<SidebarQuestionsList questions={questions} />

				<Box
					display='flex'
					flexDirection='column'
					gap='10px'
					boxShadow='lg'
					bgColor='#f6f6f6'
					borderRadius='lg'
					w='70%'
					p='20px'
				>
					<CreateQuizForm
						renderQuizSettingsManager={(params) => <SettingsModal {...params} />}
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
						+ {t('Add Question')}
					</Button>
					<Flex alignSelf='flex-end' alignItems='center' gap='10px'>
						<Box>
							{t('Questions')}:{savedQuestionsAmount}
						</Box>
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
							<Text>{t('Preview')}</Text>
						</Button>
						<Button
							colorScheme='cyan'
							color='white'
							disabled={savedQuestionsAmount === 0}
							onClick={onComplete}
						>
							{t('Complete')}
						</Button>
					</Flex>
				</Box>
			</Flex>
		</Page>
	);
};

export default CreateQuizPage;
