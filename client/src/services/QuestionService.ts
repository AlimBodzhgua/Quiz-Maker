import $axios from "@/api/axios";
import { IAnswerForm, IQuestion, IQuestionForm } from "@/types/types";
import { AnswersService } from './AnswersService';

export class QuestionService {
	
	static addQuestionOnServer = async (
		testId: string,
		question: IQuestion,
	): Promise<IQuestion | undefined> => {
		try {
			const response = await $axios.post<IQuestion>(
				`/tests/${testId}/questions`,
				question,
			);
			return response.data;
		} catch (err) {
			throw new Error(`Error adding new question ${err}`);
		}
	};

	static saveQuestion = async (testId: string, question: IQuestion, answers: IAnswerForm[]): Promise<void> => {
		const data = await QuestionService.addQuestionOnServer(testId, question);

		if (data?._id) {
			await AnswersService.addAnswersOnServer(testId, data._id, answers);
		}
	};

	static removeQuestionOnServer = async (testId: string, questionId: string): Promise<void> => {
		try {
			$axios.delete<IQuestion>(`/tests/${testId}/questions/${questionId}`);
		} catch (err) {
			throw new Error(`Error deleting question ${err}`);
		}
	};

	static removeQuestion = (questions: IQuestionForm[], testId: string, questionId: string) => {
		const removedQuestion = questions.find((question) => question._id === questionId);
		const filteredQuestions = questions.filter((question) => question._id !== questionId); 
		const updatedQuestions = filteredQuestions.map((question) => {
			if (question.order > removedQuestion!.order) {
				const updatedQuestion = { ...question, order: question.order - 1 } 

				return updatedQuestion; 
			}
			return question;
		});
	
		QuestionService.updateQuestionsOrderOnServer(testId, updatedQuestions);

		return updatedQuestions;
	};

	static updateQuestionOnServer = async (
		testId: string,
		questionId: string,
		question: Partial<IQuestion>,
	) => {
		try {
			await $axios.put(`/tests/${testId}/questions/${questionId}`, question);
		} catch (err) {
			throw new Error(`Error updating question ${err}`);
		}
	};

	static updateQuestionsOrderOnServer = async (testId: string, questions: IQuestionForm[]) => {
		try {
			questions.forEach((question) => {
				QuestionService.updateQuestionOnServer(testId, question._id, {
					order: question.order,
				});
			});
		} catch (err) {
			throw new Error(`Error updating question list ${err}`);
		}
	};
}