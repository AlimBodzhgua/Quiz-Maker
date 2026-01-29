import type { AnswerForm, QuestionType } from 'entities/Quiz';
import { useCallback, useState } from 'react';
import { falseAnswer, inputAnswer, QuestionTypes, trueAnswer } from 'shared/constants';

import { initAnswers } from '../utils';

export const useQuestionForm = () => {
	const [title, setTitle] = useState<string>('');
	const [questionType, setQuestionType] = useState<QuestionType>(QuestionTypes.multipleAnswer);
	const [answersList, setAnswersList] = useState<AnswerForm[] | null>(initAnswers(3));
	const [isRequired, setIsRequired] = useState<boolean>(true);

	const onToggleIsRequired = () => setIsRequired((prev) => !prev);

	const onChangeType = useCallback((newType: QuestionType) => {
		setQuestionType(newType);

		if (newType === QuestionTypes.inputAnswer) {
			setAnswersList([inputAnswer]);
		} else if (newType === QuestionTypes.trueOrFalse) {
			setAnswersList([trueAnswer, falseAnswer]);
		} else {
			setAnswersList(
				answersList!.map((answer) => ({ ...answer, isCorrect: false })),
			);
		}
	}, [answersList]);

	return {
		questionType,
		title,
		answersList,
		isRequired,
		onToggleIsRequired,
		setTitle,
		setAnswersList,
		onChangeType,
	};
};
