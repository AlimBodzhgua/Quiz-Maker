// import { FC, memo, useState, useCallback, useEffect } from 'react';
// import { questionTypes } from '@/constants/questions';
// import { falseAnswer, inputAnswer, trueAnswer } from '@/constants/answers';
// import { changeAnswersOrder, fixCorrectFieldForTypes, getQueryParam, initAnswers } from '@/utils/utils';
// import { IAnswerForm, QuestionType } from 'types/types';
// import { DragEndEvent } from '@dnd-kit/core';
// import { AddAnswerForm } from '../AddAnswerForm/AddAnswerForm';
// import { SortableList } from '@/lib/components/SortableList';

// interface AddAnswersFormListProps {

// }

// export const AddAnswersFormList: FC<AddAnswersFormListProps> = memo((props) => {
// 	const {  } = props;
// 	const [answersList, setAnswersList] = useState<IAnswerForm[] | null>(null);

// 	useEffect(() => {
// 		if (!answersList) {
// 			setAnswersList(initAnswers(3));
// 		}
// 	}, []);

// 	const onChangeIsCorrect = useCallback((answerId: string) => {
// 		const answers = fixCorrectFieldForTypes(answersList!, answerId, questionType);

// 		setAnswersList(answers);
// 	}, [answersList, questionType]);
	
// 	const onChangeValue = useCallback((answerId: string, value: string) => {
// 		if (answersList) {
// 			const newAnswers = answersList.map((answer) =>
// 				answer._id === answerId ? { ...answer, value } : answer,
// 			);
// 			setAnswersList(newAnswers);
// 		}
// 	}, [answersList]);

// 	const onDeleteAnswer = useCallback((answerId: string) => {
// 		const filteredAnswers = answersList!.filter((answer) => answer._id !== answerId);
// 		setAnswersList(filteredAnswers);
// 	}, [answersList]);

// 	const onAnswersDragEnd = (e: DragEndEvent) => {
// 		const { active, over } = e;
// 		if (active.id !== over?.id) {
// 			const updatedAnswers = changeAnswersOrder(answersList!, over!.id, active.id);
// 			setAnswersList(updatedAnswers);
// 		}
// 	};

// 	return (
// 		<SortableList items={answersList.map((answer) => answer._id)} onDragEnd={onAnswersDragEnd}>
// 			{answersList!.length && answersList!.map((answer) => (
// 				<AddAnswerForm
// 					key={answer._id}
// 					answer={answer}
// 					onChangeValue={onChangeValue}
// 					onChangeIsCorrect={onChangeIsCorrect}
// 					onDeleteAnswer={onDeleteAnswer}
// 				/>
// 			))}
// 		</SortableList>
// 	);
// })