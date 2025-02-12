import { useCallback, useState } from 'react';
import { falseAnswer, inputAnswer, trueAnswer } from 'shared/constants/answers';
import { QuestionTypes } from 'shared/constants/questions';
import type { AnswerForm, QuestionType } from 'entities/Quiz';
import { initAnswers } from '../utils';

export const useQuestionForm = () => {
	const [title, setTitle] = useState<string>('');
	const [questionType, setQuestionType] = useState<QuestionType>(QuestionTypes.multipleAnswer);
	const [answersList, setAnswersList] = useState<AnswerForm[] | null>(initAnswers(3));

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
		setTitle,
		setAnswersList,
		onChangeType,
	};
};
