import $axios from 'shared/api/axios';
import type { Answer, AnswerForm } from 'entities/Quiz';
import { isCorrectAnswerExist, isNoEmptyValuesAnswers } from '../lib/utils';

export class AnswersService {
	
	static isAnswersValid = (answersList: AnswerForm[]): boolean => {
		const haveValues = isNoEmptyValuesAnswers(answersList);
		const haveCorrect = isCorrectAnswerExist(answersList);
		return haveValues && haveCorrect;
	};

	static addAnswersOnServer = async (
		quizId: string,
		questionId: string,
		answers: AnswerForm[],
	): Promise<Answer[]> => {
		try {
			const promises = answers.map((answer) => {
				return $axios.post(`/quizzes/${quizId}/questions/${questionId}/answers`, answer);
			});

			const responses = await Promise.all(promises);
			const responsesData: Answer[] = responses.map((response) => response.data);
			return responsesData;
		} catch (err) {
			throw Error(`Error adding answer, ${err}`);
		}
	};
}