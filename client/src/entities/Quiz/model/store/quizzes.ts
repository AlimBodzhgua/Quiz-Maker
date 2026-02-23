import type { Quiz } from '../types';
import $axios from 'shared/api/axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface QuizState {
	quizzes: Quiz[];
	sortedAndFilteredQuizzes: Quiz[];
	error?: string;

	isSelecting: boolean;
	selectedQuizzes: string[];

	limit: number;
	page: number;

	getUserQuizzesStatus: 'idle' | 'pending' | 'success' | 'failed';
	getPublicQuizzesStatus: 'idle' | 'pending' | 'success' | 'failed';
	removeQuizStatus: 'idle' | 'pending' | 'success' | 'failed';
}

interface QuizAction {
	getUserQuizzes: (userId: string, page?: number) => Promise<Quiz[]>;
	getPublicQuizzes: (page?: number) => Promise<Quiz[]>;
	removeQuiz: (quizId: string) => Promise<void>;
	setSortedAndFilteredQuizzes: (quizzes: Quiz[]) => void;

	toggleSelect: () => void;
	selectQuiz: (quizId: string) => void;
	deselectQuiz: (quizId: string) => void;
	isSelectedQuiz: (quizId: string) => boolean;
	fullResetSelectState: () => void;
	resetSelectedList: () => void;
	removeSelectedList: () => void;
}

export const useQuizzesStore = create<QuizState & QuizAction>()(
	devtools((set, get) => ({
		quizzes: [],
		sortedAndFilteredQuizzes: [],

		limit: 12,
		page: 1,

		isSelecting: false,
		selectedQuizzes: [],

		getUserQuizzesStatus: 'idle',
		getPublicQuizzesStatus: 'idle',
		removeQuizStatus: 'idle',

		getUserQuizzes: async (userId, page = 1) => {
			set({ getUserQuizzesStatus: 'pending', page }, false, 'getUserQuizzesPending');
			try {
				set({ page });

				const response = await $axios.get('quizzes', {
					params: {
						authorId: userId,
						limit: get().limit,
						page,
					},
				});

				set({
					quizzes: response.data,
					sortedAndFilteredQuizzes: response.data,
					getUserQuizzesStatus: 'success',
				}, false, 'getUserQuizzesStatusSuccess');
				return response.data;
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'getUserQuizzes error';

				set(
					{ getUserQuizzesStatus: 'failed', error: errorMsg },
					false,
					'getUserQuizzesFailed',
				);
			}
		},

		getPublicQuizzes: async (page) => {
			set({ getPublicQuizzesStatus: 'pending' }, false, 'getPublicQuizzesPending');

			try {
				set({ page });

				const response = await $axios.get('quizzes', {
					params: {
						privacy: ['public', 'publicProtected', 'restrictedUsers'],
						limit: get().limit,
						page,
					},
				});

				const quizzes = response.data;

				set(
					{
						quizzes,
						sortedAndFilteredQuizzes: quizzes,
						getPublicQuizzesStatus: 'success',
					},
					false,
					'getPublicQuizzesSuccess',
				);

				return quizzes as Quiz[];
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'getPublicQuizzes error';

				set(
					{ getPublicQuizzesStatus: 'failed', error: errorMsg },
					false,
					'getPublicQuizzesFailed',
				);
				return [];
			}
		},

		setSortedAndFilteredQuizzes: (quizzes) => {
			set({ sortedAndFilteredQuizzes: quizzes }, false, 'setSortedAndFilteredQuizzes');
		},

		removeQuiz: async (quizId: string) => {
			set({ removeQuizStatus: 'pending' }, false, 'removeQuizPending');
			try {
				await $axios.delete(`/quizzes/${quizId}`);
				const allQuizzes = get().quizzes.filter((quiz) => quiz._id !== quizId);
				const sortedQuizzes = get().sortedAndFilteredQuizzes.filter((quiz) => quiz._id !== quizId);

				set(
					{
						quizzes: allQuizzes,
						sortedAndFilteredQuizzes: sortedQuizzes,
						removeQuizStatus: 'success',
					},
					false,
					'removeQuizSuccess',
				);
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'removeQuiz error';

				set({ removeQuizStatus: 'failed', error: errorMsg }, false, 'removeQuizFailed');
			}
		},

		toggleSelect: () => {
			set({ isSelecting: !get().isSelecting });

			if (!get().isSelecting) {
				get().resetSelectedList();
			}
		},

		selectQuiz: (quizId) => {
			set({ selectedQuizzes: [...get().selectedQuizzes, quizId] });
		},

		deselectQuiz: (quizId) => {
			set({ selectedQuizzes: get().selectedQuizzes.filter((quiz) => quiz !== quizId) });
		},

		isSelectedQuiz: (quizId) => get().selectedQuizzes.includes(quizId),

		fullResetSelectState: () => {
			set({ selectedQuizzes: [], isSelecting: false });
		},

		resetSelectedList: () => {
			set({ selectedQuizzes: [] });
		},

		removeSelectedList: () => {
			const promises = get().selectedQuizzes.map((quiz) => {
				return get().removeQuiz(quiz);
			});
			Promise.all(promises);
		},
	})),
);
