import $axios from '@/api/axios';
import { IPublicUserData } from 'types/types';

export class UserService {

	static getUserData = async (userId: string): Promise<IPublicUserData> => {
		try {
			const response = await $axios.get('users', {
				params: { 'userId': userId },
			});
			
			const user = response.data[0];

			return user;
		} catch (err) {
			throw new Error(`Error getting user data ${err}`);
		}
	}
}