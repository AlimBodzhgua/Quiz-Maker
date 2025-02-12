import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import $axios from 'shared/api/axios';
import { Quiz } from '../types';

interface QuizState {
	quizzes: Quiz[];
	sortedAndFilteredQuizzes: Quiz[];
	isSelecting: boolean;
	selectedQuizzes: string[];

	getUserQuizzesStatus: 'idle' | 'pending' | 'success' | 'failed';
	getPublicQuizzesStaus: 'idle' | 'pending' | 'success' | 'failed';
	removeQuizStatus: 'idle' | 'pending' | 'success' | 'failed';
}

interface QuizAction {
	getUserQuizzes: (userId: string) => Promise<Quiz[]>;
	getPublicQuizzes: () => Promise<Quiz[]>;
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

		isSelecting: false,
		selectedQuizzes: [],

		getUserQuizzesStatus: 'idle',
		getPublicQuizzesStaus: 'idle',
		removeQuizStatus: 'idle',

		getUserQuizzes: async (userId) => {
			set({ getUserQuizzesStatus: 'pending' }, false, 'getUserQuizzesPending');
			try {
				const response = await $axios.get('quizzes', {
					params: { 'authorId': userId },
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

		getPublicQuizzes: async () => {
			set({ getPublicQuizzesStaus: 'pending' }, false, 'getPublicQuizzesPending');
			try {
				const response = await $axios.get('quizzes', {
					params: { 'privacy': 'public' },
				});
				
				set({
					quizzes: response.data,
					sortedAndFilteredQuizzes: response.data,
					getPublicQuizzesStaus: 'success',
				}, false, 'getPublicQuizzesSuccess');
				return response.data;
			} catch (err) {
				set({ getPublicQuizzesStaus: 'failed' }, false, 'getPublicQuizzesFailed');
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
