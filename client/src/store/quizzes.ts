import $axios from '@/api/axios';
import { IQuiz } from 'types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface QuizState {
	quizzes: IQuiz[];
	isLoading: boolean;
	error?: string | undefined;
}

interface QuizAction {
	getQuizzes: () => Promise<void>;
	removeQuiz: (quizId: string) => Promise<void>;
}

export const useQuizzesStore = create<QuizState & QuizAction>()(
	devtools((set, get) => ({
		quizzes: [],
		isLoading: false,
		error: undefined,

		getQuizzes: async () => {
			set({ isLoading: true }, false, 'getQuizzesLoading');
			try {
				const response = await $axios.get('quizzes');
				set({ quizzes: response.data }, false, 'getQuizzes');
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'getQuizzesError');
			} finally {
				set({ isLoading: false });
			}
		},

		removeQuiz: async (quizId: string) => {
			try {
				await $axios.delete(`/quizzes/${quizId}`);
				set({ quizzes: get().quizzes.filter((quiz) => quiz._id !== quizId) });
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'removeQuizError');
			}
		}
	})),
);
