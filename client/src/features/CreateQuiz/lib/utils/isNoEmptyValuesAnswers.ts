import type { AnswerForm } from 'entities/Quiz';

export const isNoEmptyValuesAnswers = (answers: AnswerForm[]) => {
	const answersWithValues = answers.filter((answer) => answer.value.length);

	return answers.length === answersWithValues.length;
};
