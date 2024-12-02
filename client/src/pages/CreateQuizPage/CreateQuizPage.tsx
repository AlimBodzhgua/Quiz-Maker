import { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, useToast, Text } from '@chakra-ui/react';
import { CreateQuizForm } from 'components/CreateQuizForm/CreateQuizForm';
import { AddQuestionForm } from 'components/AddQuestionForm/AddQuestionForm';
import { Page } from 'components/UI/Page/Page';
import { IQuestionForm } from 'types/types';
import { SortableList } from '@/lib/components/SortableList';
import { DragEndEvent } from '@dnd-kit/core';
import { changeListOrder, create24CharId, getQueryParam } from '@/utils/utils';
import { QuestionService } from '@/services/QuestionService';
import { ViewIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useQuizzesStore } from 'store/quizzes';
import { QUIZ_LOCALSTORAGE_KEY } from '@/constants/localStorage';

const CreateQuizPage: FC = () => {
	const [questionsList, setQuestionsList] = useState<IQuestionForm[]>([]);
	const removeQuiz = useQuizzesStore((state) => state.removeQuiz);
	const toast = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			const quizId = localStorage.getItem(QUIZ_LOCALSTORAGE_KEY);
			if (quizId) {
				removeQuiz(quizId);
				localStorage.removeItem(QUIZ_LOCALSTORAGE_KEY);
			}
		};
	}, []);

	const onAddQuestion = useCallback(() => {
		const quizId = getQueryParam('id');
		if (quizId.length) {
			setQuestionsList([...questionsList, { _id: create24CharId(), order: questionsList.length + 1 }]);
		} else {
			toast({
				title: 'Quiz not created.',
				description: 'First you need to create a quiz and save it.',
				status: 'info',
				duration: 5000,
				isClosable: true,
				position: 'top-left'
			});
		}
	}, [questionsList]);

	const onRemoveQuestion = useCallback((questionId: string) => {
		const quizId = getQueryParam('id');
		const updatedQuestions = QuestionService.removeQuestion(questionsList, quizId, questionId);

		setQuestionsList(updatedQuestions);
	}, [questionsList]);

	const onQuestionDragEnd = useCallback((e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over!.id) {
			const quizId = getQueryParam('id');
			const updatedQuestions = changeListOrder<IQuestionForm>(questionsList, over!.id, active.id);

			QuestionService.updateQuestionsOrderOnServer(quizId, updatedQuestions);

			setQuestionsList(updatedQuestions);
		}
	}, [questionsList]);

	const onComplete = () => {
		localStorage.removeItem(QUIZ_LOCALSTORAGE_KEY);
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
				{!!questionsList.length && (
					<SortableList
						items={questionsList.map((question) => question._id)}
						onDragEnd={onQuestionDragEnd}
					>
						{questionsList.map((question) => (
							<AddQuestionForm
								question={question}
								onRemoveQuestion={onRemoveQuestion}
								key={question._id}
							/>
						))}
					</SortableList>
				)}
				<Button onClick={onAddQuestion}>+ Add Question</Button>
				<Flex alignSelf='flex-end' alignItems='center' gap='10px'>
					<Box>
						Questions: {questionsList.length}
					</Box>
					<Button
						as={Link}
						state={{ page: '#PREVIEW'}}
						to={`/quiz/${getQueryParam('id')}#PREVIEW`}
						disabled={!questionsList.length}
						pointerEvents={questionsList.length ? 'all' : 'none'}
						colorScheme='blue'
						target='_blank'
					>
						<ViewIcon mr='10px' /> <Text>Preview</Text>
					</Button>
					<Button
						colorScheme='cyan'
						color='white'
						disabled={!questionsList.length}
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
