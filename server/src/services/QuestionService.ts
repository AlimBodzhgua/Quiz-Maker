import { ApiError } from '../exceptions/ApiError';
import QuestionModel from '../models/Question';

export class QuestionService {

	static checkIfQuestionExists = async (id: string) => {
		const question = await QuestionModel.findOne({ _id: id });

		if (!question) {
			throw ApiError.BadRequest('Question with such id not found');
		}

		return question;
	}
}