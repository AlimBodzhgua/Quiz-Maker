import mongoose from 'mongoose'

export class DatabaseService {

	static connectDB = async () => {
		try {
			const DATABASE = process.env.DATABASE;

			if (!DATABASE) {
				throw new Error('Database env variable is not defined');
			}

			await mongoose.connect(DATABASE)

			console.log('DB Connection successful')
		} catch (error) {
			console.log('DB Connection failed', error);
		}
	}
}