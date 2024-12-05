import $axios from '@/api/axios';
import { IQuiz } from 'types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface QuizState {
	quizzes: IQuiz[];
	isSelecting: boolean;
	selectedQuizzes: string[];
	isLoading: boolean;
	error?: string | undefined;
}

interface QuizAction {
	getQuizzes: () => Promise<void>;
	removeQuiz: (quizId: string) => Promise<void>;

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
		isSelecting: false,
		selectedQuizzes: [],
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
