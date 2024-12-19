import { useCallback, useState } from 'react';
import { falseAnswer, inputAnswer, trueAnswer } from '@/constants/answers';
import { questionTypes } from '@/constants/questions';
import { initAnswers } from '@/utils/utils';
import { IAnswerForm, QuestionType } from 'types/types';

export const useQuestionForm = () => {
	const [title, setTitle] = useState<string>('');
	const [questionType, setQuestionType] = useState<QuestionType>(questionTypes.multipleAnswer);
	const [answersList, setAnswersList] = useState<IAnswerForm[] | null>(initAnswers(3));

	const onChangeType = useCallback((newType: QuestionType) => {
		setQuestionType(newType);

		if (newType === questionTypes.inputAnswer) {
			setAnswersList([inputAnswer]);
		} else if (newType === questionTypes.trueOrFalse) {
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
