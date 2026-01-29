import type { Question, Quiz } from '../types';
import $axios from 'shared/api/axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { QuestionService } from '../../api/QuestionService';

interface CurrentQuizState {
	quiz: Quiz | null;
	questions: Question[] | null;
	correctAnswers: number;
	incorrectAnswers: number;
	answeredQuestionIds: string[];

	fetchQuizStatus: 'idle' | 'pending' | 'success' | 'failed';
	fetchQuizQuestionsStatus: 'idle' | 'pending' | 'success' | 'failed';
	getCurrentQuizStatus: 'idle' | 'pending' | 'success' | 'failed';
}

interface CurrentQuizAction {
	fetchQuiz: (quizId: string) => Promise<Quiz | undefined>;
	fetchQuizQuestions: (quizId: string) => Promise<void>;
	getCurrentQuiz: (quizId: string) => Promise<Quiz | undefined>;
	questionAnswer: (isCorrect: boolean) => void;
	addAnsweredQuestionId: (questionId: string) => void;
	resetQuizResult: () => void;
}

export const useCurrentQuiz = create<CurrentQuizState & CurrentQuizAction>()(
	devtools((set, get) => ({
		quiz: null,
		questions: null,
		answers: null,
		correctAnswers: 0,
		incorrectAnswers: 0,
		answeredQuestionIds: [],

		fetchQuizStatus: 'idle',
		fetchQuizQuestionsStatus: 'idle',
		getCurrentQuizStatus: 'idle',

		fetchQuiz: async (quizId) => {
			set({ fetchQuizStatus: 'pending' }, false, 'fetchQuizPending');

			try {
				const response = await $axios.get<Quiz>(`quizzes/${quizId}`);

				const quiz = {
					_id: response.data._id,
					title: response.data.title,
					authorId: response.data.authorId,
					createdAt: response.data.createdAt,
					withTimer: response.data.withTimer,
					timerLimit: response.data.timerLimit,
					privacy: response.data.privacy,
				} as Quiz;

				set({ quiz, fetchQuizStatus: 'success' }, false, 'fetchQuizSuccess');
				return quiz;
			} catch (err) {
				set({ fetchQuizStatus: 'failed' }, false, 'fetchQuizFailed');
			}
		},

		fetchQuizQuestions: async (quizId) => {
			set({ fetchQuizQuestionsStatus: 'pending' }, false, 'fetchQuizQuestionsPending');
			try {
				const questions = await QuestionService.fetchCurrentQuizQuestions(quizId);

				set({
					questions,
					fetchQuizQuestionsStatus: 'success',
				}, false, 'fetchCurrentQuizQuestionsSuccess');
			} catch (err) {
				set({ fetchQuizQuestionsStatus: 'failed' }, false, 'fetchQuizQuestionsFailed');
			}
		},

		getCurrentQuiz: async (quizId) => {
			set({ getCurrentQuizStatus: 'pending' }, false, 'getCurrentQuizPending');
			const quiz = await get().fetchQuiz(quizId);
			await get().fetchQuizQuestions(quizId);
			set({ getCurrentQuizStatus: 'success' }, false, 'getCurrentQuizSuccess');
			return quiz;
		},

		questionAnswer: (isCorrect) => {
			if (isCorrect) {
				set({ correctAnswers: get().correctAnswers + 1 }, false, 'addCorrectAnswer');
			} else {
				set({ incorrectAnswers: get().incorrectAnswers + 1 }, false, 'addIncorrectAnswer');
			}
		},

		addAnsweredQuestionId: (questionId) => {
			set({ answeredQuestionIds: [...get().answeredQuestionIds, questionId] }, false, 'addAnsweredQuestionId ');
		},

		resetQuizResult: () => {
			set({ correctAnswers: 0, incorrectAnswers: 0 });
		},
	})),
);
