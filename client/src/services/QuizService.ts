import $axios from '@/api/axios';
import { dateOptions } from '@/constants/options';
import { ICompletedQuiz, IQuiz } from 'types/types';
import { SortDirectionType } from 'types/sort';

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

	static saveQuizResult = async (result: Omit<ICompletedQuiz, '_id' | 'userId' | 'date'>) => {
		try {
			const date = new Date().toLocaleDateString('ru-Ru', dateOptions);

			await $axios.post('/completed-quizzes', {
				quizId: result.quizId,
				quizTitle: result.quizTitle,
				correct: result.correct,
				incorrect: result.incorrect,
				timeResult: result.timeResult,
				date,
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

	static sortByName = (quizzes: IQuiz[], direction: SortDirectionType): IQuiz[] => {
		if (direction === 'asc') {
			return [...quizzes].sort((a, b) => a.title.localeCompare(b.title));
		}
		return [...quizzes].sort((a, b) => b.title.localeCompare(a.title));
	};

	static sortByDate = (quizzes: IQuiz[], direction: SortDirectionType): IQuiz[] => {
		if (direction === 'asc') {
			return [...quizzes].sort(
				(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			);
		}
		return [...quizzes].sort(
			(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		);
	};
}