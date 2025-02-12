import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UniqueIdentifier } from '@dnd-kit/core';
import { addQueryParam } from 'shared/utils/utils';
import { QUIZ_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';
import { PrivacyValues } from 'shared/constants/privacy';
import type { AnswerForm, Quiz, Question, QuestionForm } from 'entities/Quiz';
import $axios from 'shared/api/axios';
import { create24CharId, changeListOrder, removeItemAndFixListOrder } from '../lib/utils';
import { QuestionService } from '../api/QuestionService';

interface CreateQuizState {
	quizId: string | null;
	questions: QuestionForm[];
	savedQuestionsAmount: number;
}

interface CreateQuizActions {
	resetQuiz: () => void;
	createQuiz: (title: string) => Promise<Quiz>;
	updateQuiz: (newQuiz: Partial<Quiz>) => Promise<Quiz>;
	addQuestion: () => void;
	createQuestion: () => QuestionForm;
	removeQuestion: (questionId: string) => void;
	questionsDragEnd: (overId: UniqueIdentifier, activeId: UniqueIdentifier) => void;
	saveQuestion: (question: Omit<Question, 'quizId'>, questionAnswers: AnswerForm[]) => Promise<void>;
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
			const response = await $axios.post<Quiz>('quizzes', { title, privacy: PrivacyValues.private });

			const quizId = response.data._id;
			set({ quizId: quizId }, false, 'createQuiz');

			localStorage.setItem(QUIZ_LOCALSTORAGE_KEY, quizId);
			addQueryParam('id', quizId);
			return response.data;
		},

		updateQuiz: async (newQuiz) => {
			const response = await $axios.put<Quiz>(`/quizzes/${get().quizId}`, {
				title: newQuiz.title,
				privacy: newQuiz.privacy,
				withTimer: newQuiz.withTimer,
				timerLimit: newQuiz.timerLimit,
			});
								
			return response.data;
		},

		createQuestion: () => {
			return { _id: create24CharId(), order: get().questions.length + 1 };
		},

		addQuestion: () => {
			set({ questions: [...get().questions, get().createQuestion()] }, false, 'addQustion');
		},

		removeQuestion: (questionId) => {
			const updatedQuestions = removeItemAndFixListOrder<QuestionForm>(get().questions, questionId);
			QuestionService.updateQuestionsOrderOnServer(get().quizId!, updatedQuestions);

			set({
				questions: updatedQuestions,
				savedQuestionsAmount: get().savedQuestionsAmount - 1,
			}, false, 'removeQuestion');
		},

		questionsDragEnd: (overId, activeId) => {
			const updatedQuestions = changeListOrder<QuestionForm>(get().questions, overId, activeId);
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