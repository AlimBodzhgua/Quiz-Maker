import type { CompletedQuiz, Quiz, SortDirectionType, SortFieldType } from '../model/types';

import $axios from 'shared/api/axios';
import { dateOptions } from '../lib/options';

export class QuizService {
	static fetchCompletedQuizzes = async () => {
		try {
			const response = await $axios.get<CompletedQuiz[]>('/completed-quizzes');

			return response.data;
		} catch (err) {
			throw new Error(`Error fetching completed quizzes ${err}`);
		}
	};

	static saveQuizResult = async (result: Omit<CompletedQuiz, '_id' | 'userId' | 'date'>) => {
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

	static countParticipants = async (quizId: string): Promise<number> => {
		const completedQuizzes = await QuizService.fetchCompletedQuizzes();
		const selectedQuizzes = completedQuizzes.filter((quiz) => quiz.quizId === quizId);
		const selectedQuizzesUsers = selectedQuizzes.map((quiz) => quiz.userId);
		const uniqueUsersAmount = new Set(selectedQuizzesUsers).size;

		return uniqueUsersAmount;
	};

	static sortByName = (quizzes: Quiz[], direction: SortDirectionType): Quiz[] => {
		if (direction === 'asc') {
			return [...quizzes].sort((a, b) => a.title.localeCompare(b.title));
		}
		return [...quizzes].sort((a, b) => b.title.localeCompare(a.title));
	};

	static sortByDate = (quizzes: Quiz[], direction: SortDirectionType): Quiz[] => {
		if (direction === 'asc') {
			return [...quizzes].sort(
				(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			);
		}
		return [...quizzes].sort(
			(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		);
	};

	static sortQuizzes = (quizzes: Quiz[], field: SortFieldType, direction: SortDirectionType) => {
		switch (field) {
			case 'date':
				return QuizService.sortByDate(quizzes, direction);
			case 'name':
				return QuizService.sortByName(quizzes, direction);
		}
	};

	static getPublicQuizzesPagesAmount = async (limit: number) => {
		try {
			const response = await $axios.get('quizzes/count-public');
			const pagesAmount = Math.ceil(response.data / limit);

			return pagesAmount;
		} catch (err) {
			throw new Error(`Error getting public quizzes pages amount ${err}`);
		}
	};

	static getUserQuizzesPagesAmount = async (limit: number) => {
		try {
			const response = await $axios.get('quizzes/count-users');
			const pagesAmount = Math.ceil(response.data / limit);

			return pagesAmount;
		} catch (err) {
			throw new Error(`Error getting user quizzes pages amount ${err}`);
		}
	};
}
