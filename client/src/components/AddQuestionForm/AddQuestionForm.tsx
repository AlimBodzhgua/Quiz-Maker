import { FC, memo, useState, useCallback, useEffect } from 'react';
import { Button, Flex, Input, Tooltip } from '@chakra-ui/react';
import { questionTypes } from '@/constants/questions';
import { baseAnswer, falseAnswer, inputAnswer, trueAnswer } from '@/constants/answers';
import { changeListOrder, fixCorrectFieldForTypes, getQueryParam, initAnswers } from '@/utils/utils';
import { DragEndEvent } from '@dnd-kit/core';
import { SortableList } from '@/lib/components/SortableList';
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';
import { useHover } from '@/hooks/useHover';
import { SortableItem } from '@/lib/components/SortableItem';
import { IAnswerForm, IQuestionForm, QuestionType } from 'types/types';
import { useTestsStore } from 'store/tests';
import { AddAnswerForm } from '../AddAnswerForm/AddAnswerForm';
import { QuestionTypeSelector } from '../QuestionTypeSelector/QuestionTypeSelector';

interface AddQuestionFormProps {
	question: IQuestionForm;
	onRemoveQuestion: (question: string) => void;
}

export const AddQuestionForm: FC<AddQuestionFormProps> = memo((props) => {
	const { question, onRemoveQuestion } = props;
	const [questionType, setQuestionType] = useState<QuestionType>(questionTypes.multipleAnswer);
	const [title, setTitle] = useState<string>('');
	const [answersList, setAnswersList] = useState<IAnswerForm[] | null>(null);
	const addQuestion = useTestsStore((state) => state.addQuestion);
	const addAnswers = useTestsStore((state) => state.addAnswers);
	const [isHover, hoverProps] = useHover();
	const showAddBtn = questionType === questionTypes.multipleAnswer || questionType === questionTypes.oneAnswer;
	const showSaveBtn = answersList && title.length;

	useEffect(() => {
		if (!answersList) {
			setAnswersList(initAnswers(3));
		}
	}, []);

	useEffect(() => {
		if (questionType === questionTypes.inputAnswer) {
			setAnswersList([inputAnswer]);
		} else if (questionType === questionTypes.trueOrFalse) {
			setAnswersList([trueAnswer, falseAnswer]);
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
		const newAnswers = [
			...answersList!,
			{ ...baseAnswer, _id: crypto.randomUUID(), order: answersList!.length + 1 },
		];
		setAnswersList(newAnswers);
	};

	const onDeleteAnswer = useCallback((answerId: string) => {
		const filteredAnswers = answersList!.filter((answer) => answer._id !== answerId);
		setAnswersList(filteredAnswers);
	}, [answersList]);

	const onChnageTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	
	const onSave = async () => {
		if (answersList) {
			const testId = getQueryParam('id');
			const newQuestion = {
				description: title,
				type: questionType,
				order: question.order,
				testId,
			}
			const data = await addQuestion(testId, newQuestion);
			if (data?._id) {
				addAnswers(testId, data._id, answersList);
			}
		}
	};

	const onAnswersDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over?.id) {
			const updatedAnswers = changeListOrder<IAnswerForm>(answersList!, over!.id, active.id);
			setAnswersList(updatedAnswers);
		}
	};
	
	const handleRemoveQuestion = () => {
		onRemoveQuestion(question._id);
	}

	return (
		<SortableItem id={question._id}>
			<Flex
				direction='column'
				borderRadius='base'
				bg='blue.100'
				p='10px 8px'
				position='relative'
				{...hoverProps}
			>
				<Flex
					direction='column'
					position='absolute'
					right='-52px'
					top='0'
					gap='10px'
					bg='blue.100'
					p='10px 8px'
					transform={isHover ? 'scale(1)': 'scale(0)'}
					transition={'transform .2s linear'}
				>
					<Button onClick={handleRemoveQuestion} size='sm'><DeleteIcon /></Button>
					<Button size='sm' cursor='grab'><DragHandleIcon /></Button>
				</Flex>
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
						{!!answersList.length && answersList.map((answer) => (
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
				{(showAddBtn && answersList) && (
					<Tooltip label={answersList.length >= 5 && 'max answers amount is 5'}>
						<Button
							onClick={onAddAnswer}
							disabled={answersList.length >= 5 ? true : false}
							alignSelf='flex-end'
							size='sm'
						>
							+ Add Answer
						</Button>
					</Tooltip>
				)}
				{!!showSaveBtn && <Button mt='8px' onClick={onSave}>Save question</Button>}
			</Flex>
		</SortableItem>
	);
})