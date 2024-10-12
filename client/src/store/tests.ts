import $axios from 'src/api/axios';
import { ITest } from 'src/types/types';
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
	removeTest: (testId: string) => void;
}

export const useTestsStore = create<TestState & TestAction>()(
	devtools((set) => ({
		tests: [],
		isLoading: false,
		error: undefined,

		getTests: async () => {
			set({ isLoading: true });
			try {
				const response = await $axios.get('tests');
				set({ tests: response.data }, false, 'getTests');
			} catch (err) {
				set({ error: JSON.stringify(err) });
			} finally {
				set({ isLoading: false });
			}
		},

		createTest: async (title: string) => {
			set({ isLoading: true });
			try {
				const response = await $axios.post('tests', { title });
				set((state) => ({ tests: [...state.tests, response.data] }));
			} catch (err) {
				set({ error: JSON.stringify(err) });
			} finally {
				set({ isLoading: true });
			}
		},

		removeTest: (testId: string) => {
			set({ isLoading: true });
			try {
				$axios.delete(`/tests/${testId}`);
			} catch (err) {
				set({ error: JSON.stringify(err) });
			} finally {
				set({ isLoading: true });
			}
		},
	})),
);
