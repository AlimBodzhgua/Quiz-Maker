import type { AnswerForm, Question, QuestionForm } from 'entities/Quiz';

import $axios from 'shared/api/axios';

import { AnswersService } from './AnswersService';

export class QuestionService {
	static removeQuestionOnServer = async (quizId: string, questionId: string): Promise<void> => {
		try {
			$axios.delete<Question>(`/quizzes/${quizId}/questions/${questionId}`);
		} catch (err) {
			throw new Error(`Error deleting question ${err}`);
		}
	};

	static updateQuestionOnServer = async (
		quizId: string,
		questionId: string,
		question: Partial<Question>,
	) => {
		try {
			await $axios.put(`/quizzes/${quizId}/questions/${questionId}`, question);
		} catch (err) {
			throw new Error(`Error updating question ${err}`);
		}
	};

	static addQuestionOnServer = async (
		quizId: string,
		question: Question,
	): Promise<Question | undefined> => {
		try {
			const response = await $axios.post<Question>(
				`/quizzes/${quizId}/questions`,
				question,
			);
			return response.data;
		} catch (err) {
			throw new Error(`Error adding new question ${err}`);
		}
	};

	static saveQuestion = async (quizId: string, question: Question, answers: AnswerForm[]): Promise<void> => {
		const data = await QuestionService.addQuestionOnServer(quizId, question);

		if (data?._id) {
			await AnswersService.addAnswersOnServer(quizId, data._id, answers);
		}
	};

	static updateQuestionsOrderOnServer = async (quizId: string, questions: QuestionForm[]) => {
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
