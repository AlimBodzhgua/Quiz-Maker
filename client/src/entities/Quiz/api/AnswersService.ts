import $axios from 'shared/api/axios';
import { Answer, AnswerForm } from '../model/types';

export class AnswersService {
	
	static fetchQuestionAnswers = async (quizId: string, questionId: string): Promise<Answer[]> => {
		try {
			const response = await $axios.get<Answer[]>(`quizzes/${quizId}/questions/${questionId}/answers`);
			const orderedAnswers = response.data.sort((a, b) => a.order > b.order ? 1 : -1);
			
			return orderedAnswers;
		} catch (err) {
			throw Error(`Error adding answer, ${err}`);
		}
	};

	static addAnswersOnServer = async (
		quizId: string,
		questionId: string,
		answers: AnswerForm[],
	): Promise<Answer[]> => {
		try {
			const promises = answers.map((answer) => {
				return $axios.post(`/quizzes/${quizId}/questions/${questionId}/answers`, answer);
			});

			const responses = await Promise.all(promises);
			const responsesData: Answer[] = responses.map((response) => response.data);
			return responsesData;
		} catch (err) {
			throw Error(`Error adding answer, ${err}`);
		}
	};
}