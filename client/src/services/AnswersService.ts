import $axios from '@/api/axios';
import { IAnswer, IAnswerForm } from 'types/types';
import { isCorrectAnswerExist, isNoEmptyValuesAnswers } from '@/utils/utils';

export class AnswersService {
	
	static addAnswersOnServer = async (
		testId: string,
		questionId: string,
		answers: IAnswerForm[],
	): Promise<IAnswer[]> => {
		try {
			const promises = answers.map((answer) => {
				return $axios.post(`/tests/${testId}/questions/${questionId}/answers`, answer);
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