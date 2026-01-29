import { baseAnswer } from 'shared/constants';

export const initAnswers = (amount: number) => {
	return Array
		.from({ length: amount })
		.map((_, index) => ({ ...baseAnswer, _id: crypto.randomUUID(), order: index + 1 }));
};
