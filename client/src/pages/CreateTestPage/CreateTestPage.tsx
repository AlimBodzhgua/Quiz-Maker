import { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, useToast, Text } from '@chakra-ui/react';
import { CreateTestForm } from 'components/CreateTestForm/CreateTestForm';
import { AddQuestionForm } from 'components/AddQuestionForm/AddQuestionForm';
import { Page } from 'components/UI/Page/Page';
import { IQuestionForm } from 'types/types';
import { SortableList } from '@/lib/components/SortableList';
import { DragEndEvent } from '@dnd-kit/core';
import { changeListOrder, create24CharId, getQueryParam } from '@/utils/utils';
import { QuestionService } from '@/services/QuestionService';
import { ViewIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const CreateTestPage: FC = () => {
	const [questionsList, setQuestionsList] = useState<IQuestionForm[]>([]);
	const toast = useToast();

	useEffect(() => {
		return () => {
			window.history.pushState({}, document.title, window.location.pathname);
		};
	}, []);

	const onAddQuestion = useCallback(() => {
		const testId = getQueryParam('id');
		if (testId.length) {
			setQuestionsList([...questionsList, { _id: create24CharId(), order: questionsList.length + 1 }]);
		} else {
			toast({
				title: 'Test not created.',
				description: 'First you need to create a test and save it.',
				status: 'info',
				duration: 5000,
				isClosable: true,
				position: 'top-left'
			});
		}
	}, [questionsList]);

	const onRemoveQuestion = useCallback((questionId: string) => {
		const testId = getQueryParam('id');
		const updatedQuestions = QuestionService.removeQuestion(questionsList, testId, questionId);

		setQuestionsList(updatedQuestions);
	}, [questionsList]);

	const onQuestionDragEnd = useCallback((e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over!.id) {
			const testId = getQueryParam('id');
			const updatedQuestions = changeListOrder<IQuestionForm>(questionsList, over!.id, active.id)

			QuestionService.updateQuestionsOrderOnServer(testId, updatedQuestions);

			setQuestionsList(updatedQuestions);
		}
	}, [questionsList]);

	const onComplete = () => {
		console.log('on complete');
	};

	return (
		<Page>
			<Heading m='12px 0'>Сreating a new test</Heading>
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
				<CreateTestForm />
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
						disabled={!questionsList.length}
						state={{ page: '#PREVIEW'}}
						to={`/test/${getQueryParam('id')}#PREVIEW`}
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

export default CreateTestPage;
