import $axios from '@/api/axios';
import { TimerLimit } from 'types/timer';
import { IAnswer, IQuestion, ITest } from '@/types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CurrentTestState {
	test: ITest | null;
	questions: IQuestion[] | null;
	answers: IAnswer[] | null;
	correctAnswers: number;
	incorrectAnswers: number;

	isLoading: boolean;
	error?: string | undefined;
}

interface CurrentTestAscion {
	fetchCurrentTest: (testId: string) => Promise<ITest | undefined>;
	fetchCurrentTestQuestions: (testId: string) => Promise<void>;
	fetchQuestionsAnswers: (testId: string, questionsId: string) => Promise<IAnswer[] | undefined>;
	getCurrentTest: (testId: string) => Promise<ITest | undefined>;
	questionAnswer: (isCorrect: boolean) => void;
	resetTestResult: () => void;
	saveTestResult: (timeResult?: TimerLimit) => Promise<void>;
}

export const useCurrentTest = create<CurrentTestState & CurrentTestAscion>()(
	devtools((set, get) => ({
		test: null,
		questions: null,
		answers: null,
		correctAnswers: 0,
		incorrectAnswers: 0,

		isLoading: false,
		error: undefined,

		fetchCurrentTest: async (testId) => {
			try {
				const response = await $axios.get<ITest>(`tests/${testId}`);

				const test = {
					_id: response.data._id,
					title: response.data.title,
					authorId: response.data.authorId,
					createdAt: response.data.createdAt,
					withTimer: response.data.withTimer,
					timerLimit: response.data.timerLimit,
				};

				set({ test: test }, false, 'fetchCurrentTest');
				return test;
			} catch (err) {
				set({ error: JSON.stringify(err) });
			}
		},

		fetchCurrentTestQuestions: async (testId) => {
			try {
				const response = await $axios.get<IQuestion[]>(`tests/${testId}/questions`);
				const orderedQuestions = response.data.sort((a, b) => a.order > b.order ? 1 : -1);

				set({ questions: orderedQuestions }, false, 'fetchCurrentTestQuestions');
			} catch (err) {
				set({ error: JSON.stringify(err) });
			}
		},

		fetchQuestionsAnswers: async (testId, questionId) => {
			try {
				const response = await $axios.get<IAnswer[]>(`tests/${testId}/questions/${questionId}/answers`);
				const orderedAnswers = response.data.sort((a, b) => a.order > b.order ? 1 : -1);
				
				set({ answers: response.data }, false, 'fetchQuestionsAnswers');
				return orderedAnswers;
			} catch (err) {
				set({ error: JSON.stringify(err) });
			}
		},

		getCurrentTest: async (testId) => {
			set({ isLoading: true }, false, 'currentTestLoading');
			const test = await get().fetchCurrentTest(testId);
			await get().fetchCurrentTestQuestions(testId);
			set({ isLoading: false }, false, 'currentTestLoading');
			return test;
		},

		questionAnswer: (isCorrect) => {
			if (isCorrect) {
				set({ correctAnswers: get().correctAnswers + 1 }, false, 'addCorrectAnswer');
			} else {
				set({ incorrectAnswers: get().incorrectAnswers + 1 }, false, 'addIncorrectAnswer');
			}
		},

		resetTestResult: () => {
			set({ correctAnswers: 0, incorrectAnswers: 0 });
		},

		saveTestResult: async (timeResult) => {
			try {
				await $axios.post('tests/completed', {
					testId: get().test?._id,
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
