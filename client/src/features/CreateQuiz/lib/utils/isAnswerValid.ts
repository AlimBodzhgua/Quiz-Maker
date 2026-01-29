import type { AnswerForm } from 'entities/Quiz';

import { isCorrectAnswerExist } from './isCorrectAnswerExist';
import { isNoEmptyValuesAnswers } from './isNoEmptyValuesAnswers';

export const isAnswersValid = (answersList: AnswerForm[]): boolean => {
	const haveValues = isNoEmptyValuesAnswers(answersList);
	const haveCorrect = isCorrectAnswerExist(answersList);

	return haveValues && haveCorrect;
};
