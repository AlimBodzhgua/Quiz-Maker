import $axios from '@/api/axios';
import { IAnswerForm, IQuestion, IQuestionForm } from 'types/types';
import { removeItemAndFixListOrder } from '@/utils/utils';
import { AnswersService } from './AnswersService';

export class QuestionService {
	
	static addQuestionOnServer = async (
		quizId: string,
		question: IQuestion,
	): Promise<IQuestion | undefined> => {
		try {
			const response = await $axios.post<IQuestion>(
				`/quizzes/${quizId}/questions`,
				question,
			);
			return response.data;
		} catch (err) {
			throw new Error(`Error adding new question ${err}`);
		}
	};

	static saveQuestion = async (quizId: string, question: IQuestion, answers: IAnswerForm[]): Promise<void> => {
		const data = await QuestionService.addQuestionOnServer(quizId, question);

		if (data?._id) {
			await AnswersService.addAnswersOnServer(quizId, data._id, answers);
		}
	};

	static removeQuestionOnServer = async (quizId: string, questionId: string): Promise<void> => {
		try {
			$axios.delete<IQuestion>(`/quizzes/${quizId}/questions/${questionId}`);
		} catch (err) {
			throw new Error(`Error deleting question ${err}`);
		}
	};

	static removeQuestion = (questions: IQuestionForm[], quizId: string, questionId: string) => {
		const updatedQuestions = removeItemAndFixListOrder<IQuestionForm>(questions, questionId);
		QuestionService.updateQuestionsOrderOnServer(quizId, updatedQuestions);

		return updatedQuestions;
	};

	static updateQuestionOnServer = async (
		quizId: string,
		questionId: string,
		question: Partial<IQuestion>,
	) => {
		try {
			await $axios.put(`/quizzes/${quizId}/questions/${questionId}`, question);
		} catch (err) {
			throw new Error(`Error updating question ${err}`);
		}
	};

	static updateQuestionsOrderOnServer = async (quizId: string, questions: IQuestionForm[]) => {
		try {
			questions.forEach((question) => {
				QuestionService.updateQuestionOnServer(quizId, question._id, {
					order: question.order,
				});
			});
		} catch (err) {
			throw new Error(`Error updating question list ${err}`);
		}
	};
}