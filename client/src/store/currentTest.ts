import $axios from '@/api/axios';
import { IAnswer, IQuestion, ITest } from '@/types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CurrentTestState {
	test: ITest | null;
	questions: IQuestion[] | null;
	answers: IAnswer[] | null;

	isLoading: boolean;
	error?: string | undefined;
}

interface CurrentTestAscion {
	fetchCurrentTest: (testId: string) => Promise<void>;
	fetchCurrentTestQuestions: (testId: string) => Promise<void>;
	fetchQuestionsAnswers: (testId: string, questionsId: string) => Promise<IAnswer[] | undefined>;
	getCurrentTest: (testId: string) => void;
}


export const useCurrentTest = create<CurrentTestState & CurrentTestAscion>()(
	devtools((set, get) => ({
		test: null,
		questions: null,
		answers: null,
		isLoading: false,
		error: undefined,

		fetchCurrentTest: async (testId) => {
			set({ isLoading: true }, false, 'fetchCurrentTestLoading');
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
			} finally {
				set({ isLoading: false });
			}
		},

		fetchCurrentTestQuestions: async (testId) => {
			set({ isLoading: true }, false, 'fetchCurrentTestQuestionsLoading');
			try {
				const response = await $axios.get<IQuestion[]>(`tests/${testId}/questions`);

				const orderedQuestions = response.data.sort((a, b) => a.order > b.order ? 1 : -1);

				set({ questions: orderedQuestions }, false, 'fetchCurrentTestQuestions');
			} catch (err) {
				set({ error: JSON.stringify(err) });
			} finally {
				set({ isLoading: false });
			}
		},

		fetchQuestionsAnswers: async (testId, questionId) => {
			set({ isLoading: true }, false, 'fetchQuestionsAnswersLoading');
			try {
				const response = await $axios.get<IAnswer[]>(`tests/${testId}/questions/${questionId}/answers`);

				set({ answers: response.data }, false, 'fetchQuestionsAnswers');
				return response.data;
			} catch (err) {
				set({ error: JSON.stringify(err) });
			} finally {
				set({ isLoading: false });
			}
		},

		getCurrentTest: (testId) => {
			get().fetchCurrentTest(testId);
			get().fetchCurrentTestQuestions(testId);
		}
	}))
);
