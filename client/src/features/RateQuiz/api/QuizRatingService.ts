import type { Rating } from 'entities/Rating';
import $axios from 'shared/api/axios';

export class QuizRatingService {
	static rate = async (quizId: string, rate: number): Promise<Rating> => {
		try {
			const response = await $axios.post<Rating>(`quizzes/${quizId}/rating`, { rate });

			return response.data;
		} catch (error) {
			throw new Error(`Error rate quiz${error}`);
		}
	};

	static removeRating = async (quizId: string) => {
		try {
			await $axios.delete(`quizzes/${quizId}/rating`);
		} catch (error) {
			throw new Error(`Error rate quiz${error}`);
		}
	};
}
