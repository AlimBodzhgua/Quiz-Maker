import $axios from '@/api/axios';
import { IQuiz } from 'types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface QuizState {
	quizzes: IQuiz[];
	sortedAndFilteredQuizzes: IQuiz[];
	isSelecting: boolean;
	selectedQuizzes: string[];
	isLoading: boolean;
	error?: string | undefined;
}

interface QuizAction {
	getUserQuizzes: (userId: string) => Promise<IQuiz[]>;
	getPublicQuizzes: () => Promise<IQuiz[]>;
	removeQuiz: (quizId: string) => Promise<void>;
	setSortedAndFilteredQuizzes: (quizzes: IQuiz[]) => void;

	toggleSelect: () => void;
	selectQuiz: (quizId: string) => void;
	deselectQuiz: (quizId: string) => void;
	isSelected: (quizId: string) => boolean;
	fullResetSelectState: () => void;
	resetSelectedList: () => void;
	removeSelectedList: () => void;
}

export const useQuizzesStore = create<QuizState & QuizAction>()(
	devtools((set, get) => ({
		quizzes: [],
		sortedAndFilteredQuizzes: [],

		isSelecting: false,
		selectedQuizzes: [],
		isLoading: false,
		error: undefined,

		getUserQuizzes: async (userId) => {
			set({ isLoading: true }, false, 'getQuizzesLoading');
			try {
				const response = await $axios.get('quizzes', {
					params: { 'authorId': userId },
				});
				set({ quizzes: response.data, sortedAndFilteredQuizzes: response.data }, false, 'getQuizzes');
				return response.data;
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'getQuizzesError');
			} finally {
				set({ isLoading: false });
			}
		},

		getPublicQuizzes: async () => {
			set({ isLoading: true }, false, 'getQuizzesLoading');
			try {
				const response = await $axios.get('quizzes', {
					params: { 'privacy': 'public' },
				});
				
				set({ quizzes: response.data, sortedAndFilteredQuizzes: response.data }, false, 'getQuizzes');
				return response.data;
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'getQuizzesError');
			} finally {
				set({ isLoading: false });
			}
		},

		setSortedAndFilteredQuizzes: (quizzes) => {
			set({ sortedAndFilteredQuizzes: quizzes });
		},

		removeQuiz: async (quizId: string) => {
			try {
				await $axios.delete(`/quizzes/${quizId}`);
				const allQuizzes = get().quizzes.filter((quiz) => quiz._id !== quizId);
				const sortedQuizzes = get().sortedAndFilteredQuizzes.filter((quiz) => quiz._id !== quizId);

				set({ quizzes: allQuizzes, sortedAndFilteredQuizzes: sortedQuizzes });
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'removeQuizError');
			}
		},

		toggleSelect: () => {
			set({ isSelecting: !get().isSelecting });
			if (!get().isSelecting) {
				get().resetSelectedList();
			}
		},

		selectQuiz: (quizId) => {
			set({ selectedQuizzes: [ ...get().selectedQuizzes, quizId ]});
		},

		deselectQuiz: (quizId) => {
			set({ selectedQuizzes: get().selectedQuizzes.filter((quiz) => quiz !== quizId )});
		},
		
		isSelected: (quizId) => {
			const selected = get().selectedQuizzes.find((quiz) => quiz === quizId);
			if (selected) {
				return true;
			}
			return false;
		},

		fullResetSelectState: () => {
			set({ selectedQuizzes: [],  isSelecting: false });
		},

		resetSelectedList: () => {
			set({ selectedQuizzes: [] });
		},

		removeSelectedList: () => {
			const promises = get().selectedQuizzes.map((quiz) => {
				return get().removeQuiz(quiz);
			})
			Promise.all(promises);
		}
	})),
);
