import $axios from '@/api/axios';
import { addQueryParam } from '@/utils/utils';
import { ITest } from 'types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TestState {
	tests: ITest[];
	isLoading: boolean;
	error?: string | undefined;
}

interface TestAction {
	getTests: () => Promise<void>;
	createTest: (title: string) => Promise<void>;
	removeTest: (testId: string) => Promise<void>;
	updateTest: (testId: string, newTest: Partial<ITest>) => Promise<void>;
}

export const useTestsStore = create<TestState & TestAction>()(
	devtools((set, get) => ({
		tests: [],
		isLoading: false,
		error: undefined,

		getTests: async () => {
			set({ isLoading: true }, false, 'getTestsLoading');
			try {
				const response = await $axios.get('tests');
				set({ tests: response.data }, false, 'getTests');
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'getTestsError');
			} finally {
				set({ isLoading: false });
			}
		},

		createTest: async (title: string) => {
			set({ isLoading: true }, false, 'createTestLoading');
			try {
				const response = await $axios.post<ITest>('tests', { title });
				
				set((state) => ({ tests: [...state.tests, response.data] }), false, 'createTest');

				addQueryParam('id', response.data._id);
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'createTestError');
			} finally {
				set({ isLoading: false });
			}
		},

		removeTest: async (testId: string) => {
			try {
				await $axios.delete(`/tests/${testId}`);
				set({ tests: get().tests.filter((test) => test._id !== testId) });
			} catch (err) {
				set({ error: JSON.stringify(err) }, false, 'removeTestError');
			}
		},

		updateTest: async (testId, newTest) => {
			try {
				const response = await $axios.put<ITest>(`/tests/${testId}`, {
					title: newTest.title,
					withTimer: newTest.withTimer,
					timerLimit: newTest.timerLimit,
				});

				const updatedTests = get().tests.map((test) => {
					if (test._id === testId) {
						return response.data;
					}
					return test;
				});
				set({ tests: updatedTests });
			} catch (err) {
				set({ error: JSON.stringify(err) });
			} finally {
				set({ isLoading: false });
			}
		}
	})),
);
