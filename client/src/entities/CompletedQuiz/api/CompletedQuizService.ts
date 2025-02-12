import $axios from 'shared/api/axios';
import { CompletedQuiz } from '../model/types';

export class CompletedQuizService {
	
	static fetchQuizzes = async () => {
		try {
			const response = await $axios.get<CompletedQuiz[]>('/completed-quizzes');

			return response.data;
		} catch (err) {
			throw new Error(`Error fetching completed quizzes ${err}`);
		}
	};

	static removeQuiz = async (id: string) => {
		try {
			await $axios.delete<CompletedQuiz>(`/completed-quizzes/${id}`);
		} catch (err) {
			throw new Error(`Error deleting quiz ${err}`);
		}
	};
}
