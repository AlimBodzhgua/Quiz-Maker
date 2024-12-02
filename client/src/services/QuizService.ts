import { ICompletedQuiz, IQuiz } from 'types/types';
import $axios from '@/api/axios';

export class QuizService {
	static getQuiz = async (quizId: string): Promise<IQuiz> => {
		try {
			const response = await $axios.get<IQuiz>(`quizzes/${quizId}`);
			return response.data;
		} catch (err) {
			throw new Error(`Error getting quiz ${err}`);
		}
	};

	static getCompletedQuizzes = async (): Promise<ICompletedQuiz[]> => {
		try {
			const response = await $axios.get<ICompletedQuiz[]>('/completed-quizzes');

			return response.data;
		} catch (err) {
			throw new Error(`Error getting completed quizzes ${err}`);
		}
	};

	static removeCompletedQuize = async (quizId: string): Promise<void> => {
		try {
			await $axios.delete<ICompletedQuiz>(`/completed-quizzes/${quizId}`);
		} catch (err) {
			throw new Error(`Error getting deleting quiz ${err}`);
		}
	};

	static saveQuizResult = async (result: Omit<ICompletedQuiz, '_id' | 'userId'>) => {
		try {
			await $axios.post('/completed-quizzes', {
				quizId: result.quizId,
				quizTitle: result.quizTitle,
				correct: result.correct,
				incorrect: result.incorrect,
				timeResult: result.timeResult,
			});
		} catch (err) {
			throw new Error(`Error saving quiz reult ${err}`);
		}
	};

	static countParticipiants = async (quizId: string): Promise<number> => {
		const completedQuizzes = await QuizService.getCompletedQuizzes();
		const selectedQuizzes = completedQuizzes.filter((quiz) => quiz.quizId === quizId);
		const selectedQuizzesUsers = selectedQuizzes.map((quiz) => quiz.userId);
		const uniqueUsersAmount = new Set(selectedQuizzesUsers).size;

		return uniqueUsersAmount;
	};
}