import { baseAnswer } from 'shared/constants';

export const initAnswers = (amount: number) => {
	return Array(amount)
		.fill(0)
		.map((_, index) => ({ ...baseAnswer, _id: crypto.randomUUID(), order: index + 1}));
};
