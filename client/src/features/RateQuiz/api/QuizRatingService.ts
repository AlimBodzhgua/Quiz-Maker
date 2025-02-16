import $axios from 'shared/api/axios';
import type { Rating } from 'entities/Rating';

export class QuizRatingService {
	static rate = async (quizId: string, rate: number): Promise<Rating> => {
		try {
			const response = await $axios.post<Rating>(`quizzes/${quizId}/rating`, { rate });
			
			return response.data;
		} catch (err) {
			throw new Error('Error rate quiz');
		}
	}

	static removeRating = async (quizId: string) => {
		try {
			await $axios.delete(`quizzes/${quizId}/rating`);
		} catch (err) {
			throw new Error('Error rate quiz');
		}
	}
}