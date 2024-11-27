import $axios from '@/api/axios';
import { addQueryParam } from '@/utils/utils';
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
	createQuiz: (title: string) => Promise<void>;
	removeQuiz: (quizId: string) => Promise<void>;
	updateQuiz: (quizId: string, newQuiz: Partial<IQuiz>) => Promise<void>;
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

		createQuiz: async (title: string) => {
			set({ isLoading: true }, false, 'createQuizLoading');
			try {
				const response = await $axios.post<IQuiz>('quizzes', { title });
				
				set((state) => ({ quizzes: [...state.quizzes, response.data] }), false, 'createQuiz');

				addQueryParam('id', response.data._id);
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'createQuizError');
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
		},

		updateQuiz: async (quizId, newQuiz) => {
			try {
				const response = await $axios.put<IQuiz>(`/quizzes/${quizId}`, {
					title: newQuiz.title,
					withTimer: newQuiz.withTimer,
					timerLimit: newQuiz.timerLimit,
				});

				const updatedQuizzes = get().quizzes.map((quiz) => {
					if (quiz._id === quizId) {
						return response.data;
					}
					return quiz;
				});
				set({ quizzes: updatedQuizzes });
			} catch (err) {
				set({ error: JSON.stringify(err) });
			} finally {
				set({ isLoading: false });
			}
		}
	})),
);
