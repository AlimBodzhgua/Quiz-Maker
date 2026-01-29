import type { Answer } from '../model/types';

import $axios from 'shared/api/axios';

export class AnswersService {
	static fetchQuestionAnswers = async (quizId: string, questionId: string): Promise<Answer[]> => {
		try {
			const response = await $axios.get<Answer[]>(`quizzes/${quizId}/questions/${questionId}/answers`);
			const orderedAnswers = response.data.sort((a, b) => a.order > b.order ? 1 : -1);

			return orderedAnswers;
		} catch (err) {
			throw new Error(`Error adding answer, ${err}`);
		}
	};
}
