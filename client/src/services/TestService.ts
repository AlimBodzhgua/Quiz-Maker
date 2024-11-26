import { ITest } from 'types/types';
import $axios from '@/api/axios';

export class TestService {

	static getTest = async (testId: string): Promise<ITest> => {
		try {
			const response = await $axios.get<ITest>(`tests/${testId}`);
			return response.data;
		} catch (err) {
			throw new Error(`Error getting test ${err}`);
		}
	}
}