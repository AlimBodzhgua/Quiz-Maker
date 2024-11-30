import $axios from '@/api/axios';
import { TimerLimit } from 'types/timer';
import { IQuestion, IQuiz } from 'types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CurrentQuizState {
	quiz: IQuiz | null;
	questions: IQuestion[] | null;
	correctAnswers: number;
	incorrectAnswers: number;

	isLoading: boolean;
	error?: string | undefined;
}

interface CurrentQuizAscion {
	fetchCurrentQuiz: (quizId: string) => Promise<IQuiz | undefined>;
	fetchCurrentQuizQuestions: (quizId: string) => Promise<void>;
	getCurrentQuiz: (quizId: string) => Promise<IQuiz | undefined>;
	questionAnswer: (isCorrect: boolean) => void;
	resetQuizResult: () => void;
	saveQuizResult: (timeResult?: TimerLimit) => Promise<void>;
}

export const useCurrentQuiz = create<CurrentQuizState & CurrentQuizAscion>()(
	devtools((set, get) => ({
		quiz: null,
		questions: null,
		answers: null,
		correctAnswers: 0,
		incorrectAnswers: 0,

		isLoading: false,
		error: undefined,

		fetchCurrentQuiz: async (quizId) => {
			try {
				const response = await $axios.get<IQuiz>(`quizzes/${quizId}`);

				const quiz = {
					_id: response.data._id,
					title: response.data.title,
					authorId: response.data.authorId,
					createdAt: response.data.createdAt,
					withTimer: response.data.withTimer,
					timerLimit: response.data.timerLimit,
				};

				set({ quiz: quiz }, false, 'fetchCurrentQuiz');
				return quiz;
			} catch (err) {
				set({ error: JSON.stringify(err) });
			}
		},

		fetchCurrentQuizQuestions: async (quizId) => {
			try {
				const response = await $axios.get<IQuestion[]>(`quizzes/${quizId}/questions`);
				const orderedQuestions = response.data.sort((a, b) => a.order > b.order ? 1 : -1);

				set({ questions: orderedQuestions }, false, 'fetchCurrentQuizQuestions');
			} catch (err) {
				set({ error: JSON.stringify(err) });
			}
		},

		getCurrentQuiz: async (quizId) => {
			set({ isLoading: true }, false, 'currentQuizLoading');
			const quiz = await get().fetchCurrentQuiz(quizId);
			await get().fetchCurrentQuizQuestions(quizId);
			set({ isLoading: false }, false, 'currentQuizLoading');
			return quiz;
		},

		questionAnswer: (isCorrect) => {
			if (isCorrect) {
				set({ correctAnswers: get().correctAnswers + 1 }, false, 'addCorrectAnswer');
			} else {
				set({ incorrectAnswers: get().incorrectAnswers + 1 }, false, 'addIncorrectAnswer');
			}
		},

		resetQuizResult: () => {
			set({ correctAnswers: 0, incorrectAnswers: 0 });
		},

		saveQuizResult: async (timeResult) => {
			try {
				await $axios.post('/completed-quizzes', {
					quizId: get().quiz?._id,
					quizTitle: get().quiz?.title,
					correct: get().correctAnswers,
					incorrect: get().incorrectAnswers,
					timeResult: timeResult,
				});
			} catch (err) {
				set({ error: JSON.stringify(err) });
			}
		},
	}))
);
