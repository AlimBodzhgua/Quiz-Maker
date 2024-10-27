import { baseAnswer } from '@/constants/answers';
import { questionTypes } from '@/constants/questions';
import { IAnswerForm, QuestionType } from '@/types/types';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const initAnswers = (amount: number) => {
	return Array(amount)
		.fill(0)
		.map((_, index) => ({ ...baseAnswer, _id: crypto.randomUUID(), order: index }));
};

export const fixCorrectFieldForTypes = (
	answers: IAnswerForm[],
	answerId: string,
	questionType: QuestionType,
) => {
	if (
		questionType === questionTypes.oneAnswer ||
		questionType === questionTypes.trueOrFalse
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

export const addQueryParam = (key: string, value: string) => {
	const url = new URL(window.location.href);
	url.searchParams.set(key, value);
	window.history.pushState({}, '', url.toString());
};

export const getQueryParam = (key: string) => {
	const url = new URL(window.location.href);
	return url.searchParams.get(key) || '';
};

export const changeAnswersOrder = (
	answersList: IAnswerForm[],
	activeId: UniqueIdentifier,
	overId: UniqueIdentifier,
) => {
	const activeIndex = answersList!.findIndex((answer) => answer._id === activeId);
	const overIndex = answersList!.findIndex((answer) => answer._id === overId);

	return arrayMove(answersList!, activeIndex, overIndex).map((answer) => {
		if (answer._id === activeId) {
			return { ...answer, order: answersList![overIndex].order };
		} else if (answer._id === overId) {
			return { ...answer, order: answersList![activeIndex].order };
		}
		return answer;
	});
};