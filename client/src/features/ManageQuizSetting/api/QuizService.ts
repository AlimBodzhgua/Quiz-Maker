import type { Quiz } from 'entities/Quiz';
import $axios from 'shared/api/axios';

type GenerateLinkReturn = {
	link: string;
	token: string;
};

export class QuizService {
	static getQuiz = async (quizId: string): Promise<Quiz> => {
		try {
			const response = await $axios.get<Quiz>(`quizzes/${quizId}`);
			return response.data;
		} catch (err) {
			throw new Error(`Error getting quiz ${err}`);
		}
	};

	static generateLink = async (quizId: string) => {
		try {
			const response = await $axios.get<GenerateLinkReturn>(`/quizzes/${quizId}/generate-link`);

			return response.data;
		} catch (err) {
			throw new Error(`Error generating link ${err}`);
		}
	};
}
