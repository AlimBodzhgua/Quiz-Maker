import { baseAnswer } from '@/constants/answers';
import { questionTypes } from '@/constants/questions';
import { IAnswerForm, IQuestionForm, QuestionType } from '@/types/types';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const initAnswers = (amount: number) => {
	return Array(amount)
		.fill(0)
		.map((_, index) => ({ ...baseAnswer, _id: crypto.randomUUID(), order: index }));
};

export const initQuestions = (amount: number) => {
	return Array(amount)
		.fill(0)
		.map((_, index) => ({ _id: crypto.randomUUID(), order: index }));
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

export const changeListOrder = <T extends IAnswerForm | IQuestionForm>(
	list: T[],
	activeId: UniqueIdentifier,
	overId: UniqueIdentifier,
) => {
	const newIndex = list.findIndex((listItem) => listItem._id === activeId);
	const oldIndex = list.findIndex((listItem) => listItem._id === overId);

	const updatedArray = arrayMove(list, oldIndex, newIndex).map((listItem, index) => {
		return { ...listItem, order: index };
	});

	return updatedArray;
};