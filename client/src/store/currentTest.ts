import $axios from '@/api/axios';
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
	fetchCurrentTest: (testId: string) => Promise<void>;
	fetchCurrentTestQuestions: (testId: string) => Promise<void>;
	fetchQuestionsAnswers: (testId: string, questionsId: string) => Promise<IAnswer[] | undefined>;
	getCurrentTest: (testId: string) => void;
	questionAnswer: (isCorrect: boolean) => void;
	resetTestResult: () => void;
	saveTestResult: () => Promise<void>;
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
				}

				set({ test: test }, false, 'fetchCurrentTest');
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
			await get().fetchCurrentTest(testId);
			await get().fetchCurrentTestQuestions(testId);
			set({ isLoading: false }, false, 'currentTestLoading');
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

		saveTestResult: async () => {
			try {
				await $axios.post('tests/completed', {
					testId: get().test?._id,
					correct: get().correctAnswers,
					incorrect: get().incorrectAnswers,
				});
			} catch (err) {
				set({ error: JSON.stringify(err) });
			}
		},
	}))
);
