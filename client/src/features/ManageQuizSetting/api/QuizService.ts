import { Quiz } from 'entities/Quiz';
import $axios from 'shared/api/axios';

export class QuizService {

	static getQuiz = async (quizId: string): Promise<Quiz> => {
		try {
			const response = await $axios.get<Quiz>(`quizzes/${quizId}`);
			return response.data;
		} catch (err) {
			throw new Error(`Error getting quiz ${err}`);
		}
	};
}