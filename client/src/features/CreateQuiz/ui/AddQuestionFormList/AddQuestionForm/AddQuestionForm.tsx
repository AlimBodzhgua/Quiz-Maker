import { FC, memo, useState, useCallback } from 'react';
import { Button, Flex, Input, ScaleFade, Tooltip, useToast } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons';
import { DragEndEvent } from '@dnd-kit/core';
import { QuestionTypes } from 'shared/constants/questions';
import { baseAnswer } from 'shared/constants/answers';
import { SortableList } from 'shared/lib/components/SortableList';
import { useHover } from 'shared/lib/hooks';
import { SortableItem } from 'shared/lib/components/SortableItem';
import { getQueryParam } from 'shared/utils/utils';
import type { QuestionForm, QuestionType, AnswerForm } from 'entities/Quiz';
import {
	changeListOrder,
	setIsCorrectMathcedType,
	removeItemAndFixListOrder,
} from '../../../lib/utils';
import { QuestionService } from '../../../api/QuestionService';
import { AnswersService } from '../../../api/AnswersService';
import { useQuestionForm } from '../../../lib/hooks/useQuestionForm';
import { useCreateQuiz } from '../../../model/store';
import { AddAnswerForm } from '../../AddAnswerForm/AddAnswerForm';
import { QuestionTypeSelector } from '../../QuestionTypeSelector/QuestionTypeSelector';

interface AddQuestionFormProps {
	question: QuestionForm;
}

export const AddQuestionForm: FC<AddQuestionFormProps> = memo((props) => {
	const { question } = props;
	const toast = useToast();
	const removeQuestion = useCreateQuiz((state) => state.removeQuestion);
	const saveQuestion = useCreateQuiz((state) => state.saveQuestion);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isHover, hoverProps] = useHover();
	const [isSaved, setIsSaved] = useState<boolean>(false);
	const {
		questionType,
        title,
        answersList,
        setTitle,
        setAnswersList,
        onChangeType,
	} = useQuestionForm();
	const showAddBtn = questionType === QuestionTypes.multipleAnswer || questionType === QuestionTypes.oneAnswer;
	const showSaveBtn = answersList && title.length;

	const onChnageTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleChangeType = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		const questionType = e.target.value as QuestionType;
		onChangeType(questionType);
	}, [answersList]);

	const onChangeValue = useCallback((answerId: string, value: string) => {
		if (answersList) {
			const newAnswers = answersList.map((answer) =>
				answer._id === answerId ? { ...answer, value } : answer,
			);
			setAnswersList(newAnswers);
		}
	}, [answersList]);

	const onChangeIsCorrect = useCallback((answerId: string) => {
		const answers = setIsCorrectMathcedType(answersList!, answerId, questionType);

		setAnswersList(answers);
	}, [answersList, questionType]);

	const onDeleteAnswer = useCallback((answerId: string) => {
		const updatedAnswers = removeItemAndFixListOrder<AnswerForm>(answersList!, answerId);

		setAnswersList(updatedAnswers);
	}, [answersList]);

	const onAnswersDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over?.id) {
			const updatedAnswers = changeListOrder<AnswerForm>(answersList!, over!.id, active.id);
			setAnswersList(updatedAnswers);
		}
	};

	const onAddAnswer = () => {
		const newAnswers = [
			...answersList!,
			{ ...baseAnswer, _id: crypto.randomUUID(), order: answersList!.length + 1 },
		];
		setAnswersList(newAnswers);
	};
	
	const handleRemoveQuestion = () => {
		removeQuestion(question._id);
		
		if (isSaved) {
			const quizId = getQueryParam('id');
			QuestionService.removeQuestionOnServer(quizId, question._id);
		}
	};

	const onEdit = () => {
		const quizId = getQueryParam('id');
		QuestionService.removeQuestionOnServer(quizId, question._id);
		setIsSaved(false);
	};

	const onSave = async () => {
		if (AnswersService.isAnswersValid(answersList!)) {
			setIsLoading(true);
			const newQuestion = {
				_id: question._id,
				description: title,
				type: questionType,
				order: question.order,
			}
			await saveQuestion(newQuestion, answersList!);
			setIsSaved(true);
			setIsLoading(false);
		} else {
			toast({
				title: 'Empty value or no correct answer.',
				description: 'All answser fileds should not be empty and should have at least 1 correct answer.',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	return (
		<SortableItem id={question._id}>
			<Flex
				direction='column'
				borderRadius='base'
				bg='blue.400'
				p='10px 8px'
				position='relative'
				{...hoverProps}
			>
				<ScaleFade in={isHover}>
					<Flex
						direction='column'
						position='absolute'
						right='-54px'
						top='-10px'
						gap='10px'
						p='10px 8px'
						bg='blue.400'
					>
						<Button onClick={handleRemoveQuestion} size='sm'>
							<DeleteIcon />
						</Button>
						<Button size='sm' cursor='grab'>
							<DragHandleIcon />
						</Button>
						{isSaved && (
							<Button size='sm' onClick={onEdit}>
								<EditIcon />
							</Button>
						)}
					</Flex>
				</ScaleFade>
				<Flex gap='10px'>
					<Input
						value={title}
						onChange={onChnageTitle}
						disabled={isSaved}
						placeholder='Question title'
						bg='whiteAlpha.900'
						w='75%'
						mb='8px'
					/>
					<QuestionTypeSelector
						value={questionType}
						onChange={handleChangeType}
						disabled={isSaved}
					/>
				</Flex>

				{answersList && (
					<SortableList
						items={answersList.map((answer) => answer._id)}
						onDragEnd={onAnswersDragEnd}
					>
						{!!answersList.length &&
							answersList.map((answer) => (
								<AddAnswerForm
									key={answer._id}
									answer={answer}
									onChangeValue={onChangeValue}
									onChangeIsCorrect={onChangeIsCorrect}
									onDeleteAnswer={onDeleteAnswer}
									isSaved={isSaved}
								/>
							))}
					</SortableList>
				)}

				{showAddBtn && answersList && (
					<Tooltip label={answersList.length >= 5 && 'max answers amount is 5'}>
						<Button
							onClick={onAddAnswer}
							disabled={answersList.length >= 5 || isSaved ? true : false}
							alignSelf='flex-end'
							size='sm'
							m='5px 0'
						>
							+ Add Answer
						</Button>
					</Tooltip>
				)}
				
				{!!showSaveBtn && (
					<Button
						mt='8px'
						onClick={onSave}
						disabled={isSaved}
						isLoading={isLoading}
						loadingText={'Saving question'}
						spinnerPlacement='end'
					>
						{isSaved
							? <Flex gap='10px' alignItems='center'>Saved<CheckIcon/></Flex>
							: 'Save question'
						}
					</Button>
				)}
			</Flex>
		</SortableItem>
	);
})