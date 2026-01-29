import type { PublicUserData } from '../model/types';
import $axios from 'shared/api/axios';

export class UserService {
	static getUserData = async (userId: string): Promise<PublicUserData> => {
		try {
			const response = await $axios.get('users', {
				params: { userId },
			});

			const user = response.data[0];

			return user;
		} catch (err) {
			throw new Error(`Error getting user data ${err}`);
		}
	};
}
