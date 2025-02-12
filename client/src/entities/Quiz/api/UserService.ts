import $axios from 'shared/api/axios';
import { PublicUserData } from '../model/types';

export class UserService {
	
	static getUserData = async (userId: string): Promise<PublicUserData> => {
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