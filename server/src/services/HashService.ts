import bcrypt from 'bcrypt';

export class HashService {

	static generateHashPassword = async (password: string, saltRounds = 10) => {
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);

		return hash;
	}
}