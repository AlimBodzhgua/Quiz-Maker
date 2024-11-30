import $axios from '@/api/axios';
import { IAnswer, IAnswerForm } from 'types/types';
import { isCorrectAnswerExist, isNoEmptyValuesAnswers } from '@/utils/utils';

export class AnswersService {
	
	static fetchQuestionAnswers = async (quizId: string, questionId: string): Promise<IAnswer[]> => {
		try {
			const response = await $axios.get<IAnswer[]>(`quizzes/${quizId}/questions/${questionId}/answers`);
			const orderedAnswers = response.data.sort((a, b) => a.order > b.order ? 1 : -1);
			
			return orderedAnswers;
		} catch (err) {
			throw Error(`Error adding answer, ${err}`);
		}
	};

	static addAnswersOnServer = async (
		quizId: string,
		questionId: string,
		answers: IAnswerForm[],
	): Promise<IAnswer[]> => {
		try {
			const promises = answers.map((answer) => {
				return $axios.post(`/quizzes/${quizId}/questions/${questionId}/answers`, answer);
			});

			const responses = await Promise.all(promises);
			const responsesData: IAnswer[] = responses.map((response) => response.data);
			return responsesData;
		} catch (err) {
			throw Error(`Error adding answer, ${err}`);
		}
	};

	static isAnswersValid = (answersList: IAnswerForm[]): boolean => {
		const haveValues = isNoEmptyValuesAnswers(answersList);
		const haveCorrect = isCorrectAnswerExist(answersList);
		return haveValues && haveCorrect;
	};
}