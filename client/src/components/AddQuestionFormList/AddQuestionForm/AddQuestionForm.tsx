import { FC, memo, useState, useCallback, useEffect } from 'react';
import { Button, Flex, Input, ScaleFade, Tooltip, useToast } from '@chakra-ui/react';
import { questionTypes } from '@/constants/questions';
import { baseAnswer, falseAnswer, inputAnswer, trueAnswer } from '@/constants/answers';
import { changeListOrder, fixCorrectFieldForTypes, getQueryParam, initAnswers, removeItemAndFixListOrder } from '@/utils/utils';
import { DragEndEvent } from '@dnd-kit/core';
import { SortableList } from '@/lib/components/SortableList';
import { CheckIcon, DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons';
import { useHover } from '@/hooks/useHover';
import { SortableItem } from '@/lib/components/SortableItem';
import { IAnswerForm, IQuestionForm, QuestionType } from 'types/types';
import { QuestionService } from '@/services/QuestionService';
import { AnswersService } from '@/services/AnswersService';
import { AddAnswerForm } from '../../AddAnswerForm/AddAnswerForm';
import { QuestionTypeSelector } from '../../QuestionTypeSelector/QuestionTypeSelector';
import { useCreateQuiz } from '@/store/createQuiz';

interface AddQuestionFormProps {
	question: IQuestionForm;
}

export const AddQuestionForm: FC<AddQuestionFormProps> = memo((props) => {
	const { question } = props;
	const [questionType, setQuestionType] = useState<QuestionType>(questionTypes.multipleAnswer);
	const [title, setTitle] = useState<string>('');
	const [answersList, setAnswersList] = useState<IAnswerForm[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isHover, hoverProps] = useHover();
	const [isSaved, setIsSaved] = useState<boolean>(false);
	const toast = useToast();
	const showAddBtn = questionType === questionTypes.multipleAnswer || questionType === questionTypes.oneAnswer;
	const showSaveBtn = answersList && title.length;

	const removeQuestion = useCreateQuiz((state) => state.removeQuestion);
	const saveQuestion = useCreateQuiz((state) => state.saveQuestion);

	useEffect(() => {
		if (!answersList) {
			setAnswersList(initAnswers(3));
		}
	}, []);

	const onChnageTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const onChangeType = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		if (answersList) {
			const questionType = e.target.value as QuestionType; 
			setQuestionType(questionType);

			if (questionType === questionTypes.inputAnswer) {
				setAnswersList([inputAnswer]);
			} else if (questionType === questionTypes.trueOrFalse) {
				setAnswersList([trueAnswer, falseAnswer]);
			} else {
				const updatedAnswers = answersList.map((answer) => ({ ...answer, isCorrect: false }));
				setAnswersList(updatedAnswers);
			}
		}
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
		const answers = fixCorrectFieldForTypes(answersList!, answerId, questionType);

		setAnswersList(answers);
	}, [answersList, questionType]);

	const onDeleteAnswer = useCallback((answerId: string) => {
		const updatedAnswers = removeItemAndFixListOrder<IAnswerForm>(answersList!, answerId);

		setAnswersList(updatedAnswers);
	}, [answersList]);

	const onAnswersDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over?.id) {
			const updatedAnswers = changeListOrder<IAnswerForm>(answersList!, over!.id, active.id);
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
						onChange={onChangeType}
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