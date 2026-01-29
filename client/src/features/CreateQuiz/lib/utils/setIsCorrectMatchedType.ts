import type { AnswerForm, QuestionType } from 'entities/Quiz';
import { QuestionTypes } from 'shared/constants';

export const setIsCorrectMatchedType = (
	answers: AnswerForm[],
	answerId: string,
	questionType: QuestionType,
) => {
	if (
		questionType === QuestionTypes.oneAnswer
		|| questionType === QuestionTypes.trueOrFalse
	) {
		return answers.map((answer) => {
			if (answer._id === answerId) {
				return { ...answer, isCorrect: true };
			}
			return { ...answer, isCorrect: false };
		});
	} else {
		return answers.map((answer) => {
			if (answer._id === answerId) {
				return { ...answer, isCorrect: !answer.isCorrect };
			}
			return answer;
		});
	}
};
