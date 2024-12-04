import { QuestionService } from '@/services/QuestionService';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UniqueIdentifier } from '@dnd-kit/core';
import { IAnswerForm, IQuestion, IQuestionForm, IQuiz } from 'types/types';
import { addQueryParam, changeListOrder, create24CharId, removeItemAndFixListOrder } from '@/utils/utils';
import { QUIZ_LOCALSTORAGE_KEY } from '@/constants/localStorage';
import $axios from '@/api/axios';

interface CreateQuizState {
	quizId: string | null;
	questions: IQuestionForm[];
	savedQuestionsAmount: number;
}

interface CreateQuizActions {
	resetQuiz: () => void;
	createQuiz: (title: string) => Promise<IQuiz>;
	updateQuiz: (newQuiz: Partial<IQuiz>) => Promise<IQuiz>;
	addQuestion: () => void;
	createQuestion: () => IQuestionForm;
	removeQuestion: (questionId: string) => void;
	questionsDragEnd: (overId: UniqueIdentifier, activeId: UniqueIdentifier) => void;
	saveQuestion: (question: Omit<IQuestion, 'quizId'>, questionAnswers: IAnswerForm[]) => Promise<void>;
}

export const useCreateQuiz = create<CreateQuizState & CreateQuizActions>()(
	devtools((set, get) => ({
		quizId: null,
		questions: [],
		savedQuestionsAmount: 0,

		resetQuiz: () => {
			localStorage.removeItem(QUIZ_LOCALSTORAGE_KEY);
			set({ quizId: null, questions: [], savedQuestionsAmount: 0 }, false, 'resetQuiz');
		},

		createQuiz: async (title: string) => {
			const response = await $axios.post<IQuiz>('quizzes', { title });

			const quizId = response.data._id;
			set({ quizId: quizId }, false, 'createQuiz');

			addQueryParam('id', quizId);
			return response.data;
		},

		updateQuiz: async (newQuiz) => {
			const response = await $axios.put<IQuiz>(`/quizzes/${get().quizId}`, {
				title: newQuiz.title,
				withTimer: newQuiz.withTimer,
				timerLimit: newQuiz.timerLimit,
			});
								
			return response.data;
		},

		createQuestion: () => {
			return { _id: create24CharId(), order: get().questions.length + 1 };
		},

		addQuestion: () => {
			console.log(get().questions);
			set({ questions: [...get().questions, get().createQuestion()] }, false, 'addQustion');
		},

		removeQuestion: (questionId) => {
			const updatedQuestions = removeItemAndFixListOrder<IQuestionForm>(get().questions, questionId);
			QuestionService.updateQuestionsOrderOnServer(get().quizId!, updatedQuestions);

			set({
				questions: updatedQuestions,
				savedQuestionsAmount: get().savedQuestionsAmount - 1,
			}, false, 'removeQuestion');
		},

		questionsDragEnd: (overId, activeId) => {
			const updatedQuestions = changeListOrder<IQuestionForm>(get().questions, overId, activeId);
			QuestionService.updateQuestionsOrderOnServer(get().quizId!, updatedQuestions);

			set({ questions: updatedQuestions }, false, 'questionsDragEnd');
		},

		saveQuestion: async (question, questionAnswers) => {
			const quizId = get().quizId!;

			await QuestionService.saveQuestion(quizId, { ...question, quizId }, questionAnswers);
			set({ savedQuestionsAmount: get().savedQuestionsAmount + 1}, false, 'saveQuestion');

		},
	}))
);