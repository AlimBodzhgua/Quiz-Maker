import { FC, memo, useState, useCallback, useEffect } from 'react';
import { Button, Flex, Input, Tooltip } from '@chakra-ui/react';
import { questionTypes } from '@/constants/questions';
import { baseAnswer, falseAnswer, inputAnswer, trueAnswer } from '@/constants/answers';
import { fixCorrectFieldForTypes, initAnswers } from '@/utils/utils';
import { IAnswerForm, QuestionType } from '@/types/types';
import { AddAnswerForm } from '../AddAnswerForm/AddAnswerForm';
import { QuestionTypeSelector } from '../QuestionTypeSelector/QuestionTypeSelector';

export const AddQuestionForm: FC = memo(() => {
	const [questionType, setQuestionType] = useState<QuestionType>(questionTypes.multipleAnswer);
	const [answersAmount, setAnswersAmount] = useState<number>(3);
	const [answersList, setAnswersList] = useState<IAnswerForm[]>(initAnswers(answersAmount));
	const showAddBtn = questionType === questionTypes.multipleAnswer || questionType === questionTypes.oneAnswer;

	useEffect(() => {
		if (answersAmount > answersList.length) {
			setAnswersList([...answersList, {...baseAnswer, _id: crypto.randomUUID()}]);
		} else if (questionType === questionTypes.inputAnswer) {
			setAnswersList([inputAnswer])
			setAnswersAmount(1);
		} else if (questionType === questionTypes.trueOrFalse) {
			setAnswersList([trueAnswer, falseAnswer]);
			setAnswersAmount(2);
		}
	}, [answersAmount, questionType])

	
	const onChangeIsCorrect = useCallback((answerId: string) => {
		const answers = fixCorrectFieldForTypes(answersList, answerId, questionType);
		setAnswersList(answers);
	}, [answersList])
	
	const onChangeValue = useCallback((answerId: string, value: string) => {
		const newAnswers = answersList.map((answer) =>
			answer._id === answerId ? { ...answer, value } : answer,
		);

		setAnswersList(newAnswers);
	}, [answersList])

	const onChangeType = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setQuestionType(e.target.value as QuestionType);

		const updatedAnswers = answersList.map((answer) => ({ ...answer, isCorrect: false }));

		setAnswersList(updatedAnswers);
	}, [answersList])

	const onAddAnswer = () => {
		setAnswersAmount(prev => prev + 1);
	}

	const onDeleteAnswer = useCallback((answerId: string) => {
		setAnswersAmount(prev => prev - 1);
		const filteredAnswers = answersList.filter((answer) => answer._id !== answerId);
		setAnswersList(filteredAnswers);
	}, [answersList])
	
	return (
		<Flex flexDirection='column' borderRadius='base' bg='blue.100' p='10px 8px'>
			<Flex gap='10px'>
				<Input placeholder='Question title' bg='whiteAlpha.900' w='75%' mb='8px' />
				<QuestionTypeSelector value={questionType} onChange={onChangeType} />
			</Flex>
			{answersList.map((answer) => (
				<AddAnswerForm
					key={answer._id}
					answer={answer}
					onChangeValue={onChangeValue}
					onChangeIsCorrect={onChangeIsCorrect}
					onDeleteAnswer={onDeleteAnswer}
				/>
			))}
			{showAddBtn && (
				<Tooltip label={answersAmount >= 5 && 'max answers amount is 5'}>
					<Button
						onClick={onAddAnswer}
						size='sm'
						alignSelf='flex-end'
						disabled={answersAmount >= 5 ? true : false}
					>
						+ Add Answer
					</Button>
				</Tooltip>
			)}
		</Flex>
	);
})