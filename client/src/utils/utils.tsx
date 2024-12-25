import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { baseAnswer } from '@/constants/answers';
import { QuestionTypes } from '@/constants/questions';
import { IAnswerForm, IQuestionForm, IQuiz, QuestionType } from 'types/types';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { TimerLimit } from 'types/timer';
import { SortDirectionType, SortFieldType } from 'types/sort';
import { DecreasingTimerProps, IncreasingTimerProps } from '@/hooks/useTimer';
import { QuizService } from '@/services/QuizService';

export const initAnswers = (amount: number) => {
	return Array(amount)
		.fill(0)
		.map((_, index) => ({ ...baseAnswer, _id: crypto.randomUUID(), order: index + 1}));
};

export const create24CharId = () => {
	return crypto.randomUUID().split('-').join('').substring(0, 24);
}

export const fixCorrectFieldForTypes = (
	answers: IAnswerForm[],
	answerId: string,
	questionType: QuestionType,
) => {
	if (
		questionType === QuestionTypes.oneAnswer ||
		questionType === QuestionTypes.trueOrFalse
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
): T[] => {
	const newIndex = list.findIndex((listItem) => listItem._id === activeId);
	const oldIndex = list.findIndex((listItem) => listItem._id === overId);

	const updatedArray = arrayMove(list, oldIndex, newIndex).map((listItem, index) => {
		return { ...listItem, order: index + 1 };
	});

	return updatedArray;
};

export const removeItemAndFixListOrder = <T extends IAnswerForm | IQuestionForm>(
	list: T[],
	removeId: string,
): T[] => {
	const removedItem = list.find((listItem) => listItem._id === removeId);
	const filteredList = list.filter((listItem) => listItem._id !== removeId); 
	const updatedList = filteredList.map((listItem) => {
		if (listItem.order > removedItem!.order) {
			return { ...listItem, order: listItem.order - 1 }; 
		}
		return listItem;
	});
	return updatedList;
};

export const isNoEmptyValuesAnswers = (answers: IAnswerForm[]) => {
	const answersWithValues = answers.filter((answer) => answer.value.length);

	return answers.length === answersWithValues.length;
};

export const isCorrectAnswerExist = (answers: IAnswerForm[]) => {
	const answersWithCorrect = answers.filter((answer) => answer.isCorrect);

	return answersWithCorrect.length >= 1;
};

export const capitalizeFirstLetter = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1, word.length);
};

export const splitCamelCaseLetter = (word: string): string => {
	return word.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const getDataMatchedAnswer = (isCorrect: boolean) => {
	return {
		color: isCorrect ? '#68AF15' : '#D30000',
		icon: isCorrect ? (
			<CheckIcon fontSize='12px' color='#fff' />
		) : (
			<CloseIcon fontSize='8px' color='#fff' />
		),
	};
};

export const subtractPixelsFromString = (px: string, amount: number) => {
	return `${Number(px.substring(0, px.length - 2)) - amount}px`;
};

export const getMathcedTimerProps = (timerLimit?: TimerLimit) => {
	const type = timerLimit ? 'decreasing' : 'increasing';

	return type === 'increasing'
		? { type: 'increasing' } as IncreasingTimerProps
		: { type: 'decreasing', limit: timerLimit } as DecreasingTimerProps; 
}

export const calculatePassedTime = (timerLimit: TimerLimit, minutes: number, seconds: number) => {
	const totalSeconds = timerLimit.minutes * 60 + timerLimit.seconds;
	const totalSecondsLeft = minutes * 60 + seconds;

	const secondsResult = (totalSeconds - totalSecondsLeft) % 60;
	const minutesResult = Math.floor((totalSeconds - totalSecondsLeft) / 60);
	return { seconds: secondsResult, minutes: minutesResult };
}

export const sortQuizzes = (quizzes: IQuiz[], field: SortFieldType, direction: SortDirectionType) => {
	switch(field) {
		case 'date':
			return QuizService.sortByDate(quizzes, direction);
		case 'name':
			return QuizService.sortByName(quizzes, direction);
	}
}
