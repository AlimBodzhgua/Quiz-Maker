import { FC, memo, useState, useCallback } from 'react';
import { Flex, useToast } from '@chakra-ui/react';
import { DragEndEvent } from '@dnd-kit/core';
import { QuestionTypes, baseAnswer } from 'shared/constants';
import { useHover } from 'shared/lib/hooks';
import { SortableItem } from 'shared/lib/components/SortableItem';
import { getQueryParam } from 'shared/utils';
import type { QuestionForm, QuestionType, AnswerForm } from 'entities/Quiz';
import { AnswersList } from './AnswersList';
import { AddAnswerButton } from './AddAnswerButton';
import { SaveButton } from './SaveButton';
import { QuestionHeader } from './QuestionHeader';
import { QuestionFormActions } from './QuestionFormActions';
import {
	changeListOrder,
	setIsCorrectMathcedType,
	removeItemAndFixListOrder,
} from '../../../lib/utils';
import { QuestionService } from '../../../api/QuestionService';
import { AnswersService } from '../../../api/AnswersService';
import { useQuestionForm } from '../../../lib/hooks/useQuestionForm';
import { useCreateQuiz } from '../../../model/store';

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
		isRequired,
		onToggleIsRequired,
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
	
	const handleRemoveQuestion = useCallback(() => {
		removeQuestion(question._id);
		
		if (isSaved) {
			const quizId = getQueryParam('id');
			QuestionService.removeQuestionOnServer(quizId, question._id);
		}
	}, [question._id]);

	const onEdit = useCallback(() => {
		const quizId = getQueryParam('id');
		QuestionService.removeQuestionOnServer(quizId, question._id);
		setIsSaved(false);
	}, [question._id]);

	const onSave = useCallback(async () => {
		if (AnswersService.isAnswersValid(answersList!)) {
			setIsLoading(true);
			const newQuestion = {
				_id: question._id,
				description: title,
				type: questionType,
				order: question.order,
				isRequired: isRequired,
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
	}, [answersList, question, questionType, title, isRequired, saveQuestion]);

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
				<QuestionHeader
					title={title}
					questionType={questionType}
					onTitleChange={onChnageTitle}
					onTypeChange={handleChangeType}
					onToggleIsRequired={onToggleIsRequired}
					isRequired={isRequired}
					isSaved={isSaved}
				/>

				<QuestionFormActions
					isHover={isHover}
					isSaved={isSaved}
					onRemove={handleRemoveQuestion}
					onEdit={onEdit}
				/>

				{answersList && (
					<AnswersList
						answers={answersList}
						onDragEnd={onAnswersDragEnd}
						onChangeValue={onChangeValue}
						onChangeIsCorrect={onChangeIsCorrect}
						onDeleteAnswer={onDeleteAnswer}
						isSaved={isSaved}
					/>
				)}

				{showAddBtn && answersList && (
					<AddAnswerButton
						onClick={onAddAnswer}
						isDisabled={answersList.length >= 5 || isSaved}
					/>
				)}
				
				{!!showSaveBtn && (
					<SaveButton 
						onClick={onSave}
						isLoading={isLoading}
						isSaved={isSaved}
					/>	
				)}
			</Flex>
		</SortableItem>
	);
})