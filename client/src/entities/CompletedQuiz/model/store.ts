import { create } from 'zustand';
import { CompletedQuiz } from './types';
import { devtools } from 'zustand/middleware';
import { CompletedQuizService } from '../api/CompletedQuizService';

type CompletedQuizState = {
	quizzes: CompletedQuiz[];
	removeQuizStatus: 'idle' | 'pending' | 'success' | 'failed';
	fetchQuizzesStatus: 'idle' | 'pending' | 'success' | 'failed';
};

type CompletedQuizAction = {
	fetchQuizzes: () => Promise<CompletedQuiz[] | undefined>;
	removeQuiz: (id: string) => Promise<void>;
};

export const useCompletedQuizzes = create<CompletedQuizState & CompletedQuizAction>()(
	devtools((set, get) => ({
		quizzes: [],
		removeQuizStatus: 'idle',
		fetchQuizzesStatus: 'idle',
		
		fetchQuizzes: async () => {
			set({ fetchQuizzesStatus: 'pending'});

			try {
				const quizzes = await CompletedQuizService.fetchQuizzes();
				set({ quizzes: quizzes, fetchQuizzesStatus: 'success' }, false, 'fetchCompletedQuizzes');

				return quizzes;
			} catch (err) {
				set({ fetchQuizzesStatus: 'failed' });
			}
		},

		removeQuiz: async (id) => {
			set({ removeQuizStatus: 'pending'});

			try {
				await CompletedQuizService.removeQuiz(id);

				const quizzes = get().quizzes.filter((quiz) => quiz._id !== id);

				set({ quizzes: quizzes, removeQuizStatus: 'success' });
			} catch (err) {
				set({ removeQuizStatus: 'failed'});
			}
		},
	})),	
)