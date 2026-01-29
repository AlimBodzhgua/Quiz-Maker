import type { UniqueIdentifier } from '@dnd-kit/core';
import type { AnswerForm, Question, QuestionForm, Quiz } from 'entities/Quiz';
import $axios from 'shared/api/axios';
import { PrivacyValues } from 'shared/constants/privacy';
import { addQueryParam } from 'shared/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { QuestionService } from '../api/QuestionService';
import { changeListOrder, create24CharId, removeItemAndFixListOrder } from '../lib/utils';

interface CreateQuizState {
	quizId: string | null;
	questions: QuestionForm[];
	savedQuestionsAmount: number;
}

interface CreateQuizActions {
	resetQuizData: () => void;
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

		resetQuizData: () => {
			set({ quizId: null, questions: [], savedQuestionsAmount: 0 }, false, 'resetQuiz');
		},

		createQuiz: async (title: string) => {
			const response = await $axios.post<Quiz>('quizzes', {
				title,
				privacy: { type: PrivacyValues.private },
			});

			const quizId = response.data._id;
			set({ quizId }, false, 'createQuiz');

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
			set({ savedQuestionsAmount: get().savedQuestionsAmount + 1 }, false, 'saveQuestion');
		},
	})),
);
