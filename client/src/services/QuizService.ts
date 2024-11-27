import { IQuiz } from 'types/types';
import $axios from '@/api/axios';

export class QuizService {

	static getQuiz = async (quizId: string): Promise<IQuiz> => {
		try {
			const response = await $axios.get<IQuiz>(`quizzes/${quizId}`);
			return response.data;
		} catch (err) {
			throw new Error(`Error getting quiz ${err}`);
		}
	}
}