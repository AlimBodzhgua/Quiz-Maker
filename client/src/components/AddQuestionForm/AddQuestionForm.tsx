import { FC, memo, useState, useCallback, useEffect } from 'react';
import { Button, Flex, Input, Tooltip } from '@chakra-ui/react';
import { questionTypes } from '@/constants/questions';
import { baseAnswer, falseAnswer, inputAnswer, trueAnswer } from '@/constants/answers';
import { changeAnswersOrder, fixCorrectFieldForTypes, getQueryParam, initAnswers } from '@/utils/utils';
import { IAnswerForm, QuestionType } from '@/types/types';
import { useTestsStore } from '@/store/tests';
import { DragEndEvent } from '@dnd-kit/core';
import { AddAnswerForm } from '../AddAnswerForm/AddAnswerForm';
import { QuestionTypeSelector } from '../QuestionTypeSelector/QuestionTypeSelector';
import { SortableList } from '@/lib/components/SortableList';


export const AddQuestionForm: FC = memo(() => {
	const [questionType, setQuestionType] = useState<QuestionType>(questionTypes.multipleAnswer);
	const [title, setTitle] = useState<string>('');
	const [answersAmount, setAnswersAmount] = useState<number>(3);
	const [answersList, setAnswersList] = useState<IAnswerForm[] | null>(null);
	const addQuestion = useTestsStore((state) => state.addQuestion);
	const addAnswers = useTestsStore((state) => state.addAnswers);
	const showAddBtn = questionType === questionTypes.multipleAnswer || questionType === questionTypes.oneAnswer;
	const showSaveBtn = answersList && title.length;

	useEffect(() => {
		if (!answersList) {
			setAnswersList(initAnswers(answersAmount));
		}
	}, []);

	useEffect(() => {
		if (questionType === questionTypes.inputAnswer) {
			setAnswersList([inputAnswer]);
			setAnswersAmount(1);
		} else if (questionType === questionTypes.trueOrFalse) {
			setAnswersList([trueAnswer, falseAnswer]);
			setAnswersAmount(2);
		}
	}, [questionType]);

	const onChangeIsCorrect = useCallback((answerId: string) => {
		const answers = fixCorrectFieldForTypes(answersList!, answerId, questionType);

		setAnswersList(answers);
	}, [answersList, questionType]);
	
	const onChangeValue = useCallback((answerId: string, value: string) => {
		if (answersList) {
			const newAnswers = answersList.map((answer) =>
				answer._id === answerId ? { ...answer, value } : answer,
			);
			setAnswersList(newAnswers);
		}
	}, [answersList]);

	const onChangeType = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		if (answersList) {
			setQuestionType(e.target.value as QuestionType);
			const updatedAnswers = answersList.map((answer) => ({ ...answer, isCorrect: false }));
	
			setAnswersList(updatedAnswers);
		}
	}, [answersList]);

	const onAddAnswer = () => {
		setAnswersAmount((prev) => prev + 1);
		const newAnswers = [
			...answersList!,
			{ ...baseAnswer, _id: crypto.randomUUID(), order: answersList!.length },
		];
		setAnswersList(newAnswers);
	};

	const onDeleteAnswer = useCallback((answerId: string) => {
		setAnswersAmount(prev => prev - 1);
		const filteredAnswers = answersList!.filter((answer) => answer._id !== answerId);
		setAnswersList(filteredAnswers);
	}, [answersList]);

	const onChnageTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	
	const onSave = async () => {
		if (answersList) {
			const testId = getQueryParam('id');
			const question = {
				description: title,
				type: questionType,
				order: 1,
				testId,
			}
			const data = await addQuestion(testId, question);
			if (data?._id) {
				addAnswers(testId, data._id, answersList);
			}
		}
	};

	const onAnswersDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over?.id) {
			const updatedAnswers = changeAnswersOrder(answersList!, over!.id, active.id);
			setAnswersList(updatedAnswers);
		}
	};
	

	return (
		<Flex
			flexDirection='column'
			borderRadius='base'
			bg='blue.100'
			p='10px 8px'
		>
			<Flex gap='10px'>
				<Input
					value={title}
					onChange={onChnageTitle}
					placeholder='Question title'
					bg='whiteAlpha.900'
					w='75%'
					mb='8px'
				/>
				<QuestionTypeSelector value={questionType} onChange={onChangeType} />
			</Flex>
			{answersList && 
				<SortableList items={answersList.map((answer) => answer._id)} onDragEnd={onAnswersDragEnd}>
					{answersList!.length && answersList!.map((answer) => (
						<AddAnswerForm
							key={answer._id}
							answer={answer}
							onChangeValue={onChangeValue}
							onChangeIsCorrect={onChangeIsCorrect}
							onDeleteAnswer={onDeleteAnswer}
						/>
					))}
				</SortableList>
			}
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
			{!!showSaveBtn && <Button mt='8px' onClick={onSave}>Save question</Button>}
		</Flex>
	);
})