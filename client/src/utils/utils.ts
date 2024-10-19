import { baseAnswer } from '@/constants/answers';
import { questionTypes } from '@/constants/questions';
import { IAnswerForm, QuestionType } from '@/types/types';

export const initAnswers = (amount: number) => {
	return Array(amount)
		.fill(0)
		.map(() => ({ ...baseAnswer, _id: crypto.randomUUID() }));
};

export const fixCorrectFieldForTypes = (
	answers: IAnswerForm[],
	answerId: string,
	questionType: QuestionType,
) => {
	if (questionType === questionTypes.oneAnswer || questionType === questionTypes.multipleAnswer) {
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
