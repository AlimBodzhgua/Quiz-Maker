import type { AnswerForm } from 'entities/Quiz';

export const isCorrectAnswerExist = (answers: AnswerForm[]) => {
	const answersWithCorrect = answers.filter((answer) => answer.isCorrect);

	return answersWithCorrect.length >= 1;
};
