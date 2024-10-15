import { FC, memo, useState, useCallback } from 'react';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { questionTypes } from '@/constants/questions';
import { QuestionType } from '@/types/types';
import { AddAnswerForm } from '../AddAnswerForm/AddAnswerForm';
import { QuestionTypeSelector } from '../QuestionTypeSelector/QuestionTypeSelector';


export const AddQuestionForm: FC = memo(() => {
	const [questionType, setQuestionType] = useState<QuestionType>(questionTypes.multipleAnswer);
	const [answersAmount, setAnswersAmount] = useState<number>(2);

	const onChangeType = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setQuestionType(e.target.value as QuestionType);
	}, [])

	const onAddAnswer = () => {
		setAnswersAmount(prev => prev + 1);
	}

	const onDeletedAnswer = () => {
		setAnswersAmount(prev => prev - 1);
	}

	return (
		<Box bg='blue.100' p='10px 8px' borderRadius='base'>
			<Flex gap='10px'>
				<Input placeholder='Question title' bg='whiteAlpha.900' w='75%' mb='8px' />
				<QuestionTypeSelector value={questionType} onChange={onChangeType}/>
			</Flex>
			{Array(answersAmount)
				.fill(0)
				.map((value, index) => (
					<AddAnswerForm key={index} />
				))}
			<Button onClick={onAddAnswer} alignSelf='center' size='sm'>
				Add Answer
			</Button>
		</Box>
	);
})