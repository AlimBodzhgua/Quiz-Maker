import { ApiError } from '../exceptions/ApiError';
import QuizModel from '../models/Quiz';

export class QuizService {

	static checkIfQuizExists = async (id: string) => {
		const quiz = await QuizModel.findById(id);

		if (!quiz) {
			throw ApiError.BadRequest('Quiz with such id not found');
		}

		return quiz;
	}
}