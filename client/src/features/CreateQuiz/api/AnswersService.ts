import type { Answer, AnswerForm } from 'entities/Quiz';

import $axios from 'shared/api/axios';

export class AnswersService {
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
			throw new Error(`Error adding answer, ${err}`);
		}
	};
}
