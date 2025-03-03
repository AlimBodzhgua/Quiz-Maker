import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import $axios from 'shared/api/axios';
import { Quiz } from '../types';

interface QuizState {
	quizzes: Quiz[];
	sortedAndFilteredQuizzes: Quiz[];

	isSelecting: boolean;
	selectedQuizzes: string[];

	limit: number;
	page: number;

	getUserQuizzesStatus: 'idle' | 'pending' | 'success' | 'failed';
	getPublicQuizzesStaus: 'idle' | 'pending' | 'success' | 'failed';
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
		getPublicQuizzesStaus: 'idle',
		removeQuizStatus: 'idle',

		getUserQuizzes: async (userId, page = 1) => {
			set({ getUserQuizzesStatus: 'pending', page: page }, false, 'getUserQuizzesPending');
			try {
				set({ page: page });

				const response = await $axios.get('quizzes', {
					params: {
						authorId: userId,
						limit: get().limit,
						page: page,
					},
				});

				set({
					quizzes: response.data,
					sortedAndFilteredQuizzes: response.data,
					getUserQuizzesStatus: 'success',
				}, false, 'getUserQuizzesStatusSuccess');
				return response.data;
			} catch (err) {
				set({ getUserQuizzesStatus: 'failed' }, false, 'getUserQuizzesFailed');
			}
		},

		getPublicQuizzes: async (page) => {
			set({ getPublicQuizzesStaus: 'pending' }, false, 'getPublicQuizzesPending');
			try {
				set({ page: page });

				const response = await $axios.get('quizzes', {
					params: {
						'privacy': ['public', 'publicProtected', 'restrictedUsers'],
						limit: get().limit,
						page: page,
					},
				});

				const quizzes = response.data;

				set({
					quizzes: quizzes,
					sortedAndFilteredQuizzes: quizzes,
					getPublicQuizzesStaus: 'success',
				}, false, 'getPublicQuizzesSuccess');
				return quizzes as Quiz[];
			} catch (err) {
				set({ getPublicQuizzesStaus: 'failed' }, false, 'getPublicQuizzesFailed');
				throw new Error('Failed to fecth public quizzes');
			}
		},

		setSortedAndFilteredQuizzes: (quizzes) => {
			set({ sortedAndFilteredQuizzes: quizzes }, false, 'setSortedAndFilteredQuizzes');
		},

		removeQuiz: async (quizId: string) => {
			set({ removeQuizStatus: 'pending'}, false, 'removeQuizPending');
			try {
				await $axios.delete(`/quizzes/${quizId}`);
				const allQuizzes = get().quizzes.filter((quiz) => quiz._id !== quizId);
				const sortedQuizzes = get().sortedAndFilteredQuizzes.filter((quiz) => quiz._id !== quizId);

				set({
					quizzes: allQuizzes,
					sortedAndFilteredQuizzes: sortedQuizzes,
					removeQuizStatus: 'success',
				}, false, 'removeQuizSuccess');
			} catch (err) {
				set({ removeQuizStatus: 'failed' }, false, 'removeQuizFailed');
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
		
		isSelectedQuiz: (quizId) => get().selectedQuizzes.includes(quizId),

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
