import $axios from 'shared/api/axios';
import { Question } from '../model/types';

export class QuestionService {
	
	static fetchCurrentQuizQuestions = async (quizId: string): Promise<Question[]> => {
		try {
			const response = await $axios.get<Question[]>(`quizzes/${quizId}/questions`);
			const orderedQuestions = response.data.sort((a, b) => a.order > b.order ? 1 : -1);

			return orderedQuestions;
		} catch (err) {
			throw new Error(`Error updating question ${err}`);
		}
	};
	
	static countQuizQuestions = async (quizId: string): Promise<number> => {
		const questions = await QuestionService.fetchCurrentQuizQuestions(quizId);
		return questions.length;
	};
}