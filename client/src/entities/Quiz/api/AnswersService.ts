import $axios from 'shared/api/axios';
import { Answer } from '../model/types';

export class AnswersService {
	
	static fetchQuestionAnswers = async (quizId: string, questionId: string): Promise<Answer[]> => {
		try {
			const response = await $axios.get<Answer[]>(`quizzes/${quizId}/questions/${questionId}/answers`);
			const orderedAnswers = response.data.sort((a, b) => a.order > b.order ? 1 : -1);
			
			return orderedAnswers;
		} catch (err) {
			throw Error(`Error adding answer, ${err}`);
		}
	};
}