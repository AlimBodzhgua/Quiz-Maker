import { FC, useCallback, useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { CreateTestForm } from 'components/CreateTestForm/CreateTestForm';
import { AddQuestionForm } from 'components/AddQuestionForm/AddQuestionForm';
import { Page } from 'components/UI/Page/Page';
import { SortableList } from '@/lib/components/SortableList';
import { DragEndEvent } from '@dnd-kit/core';
import { changeListOrder, create24CharId } from '@/utils/utils';
import { IQuestionForm } from 'types/types';


const CreateTestPage: FC = () => {
	const [questionsList, setQuestionsList] = useState<IQuestionForm[]>([]);

	const onAddQuestion = useCallback(() => {
		setQuestionsList([
			...questionsList,
			{ _id: create24CharId(), order: questionsList.length + 1 },
		]);
	}, [questionsList]);

	const onRemoveQuestion = useCallback((questionId: string) => {
		const filteredQuestions = questionsList.filter((question) => question._id !== questionId); 

		setQuestionsList(filteredQuestions);
	}, [questionsList]);

	const onQuestionDragEnd = useCallback((e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over!.id) {
			const updatedQuestions = changeListOrder<IQuestionForm>(questionsList, over!.id, active.id)
			setQuestionsList(updatedQuestions);
		}
	}, [questionsList]);

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

				<Button onClick={onAddQuestion}>+ New Question</Button>
			</Box>
		</Page>
	);
};

export default CreateTestPage;
