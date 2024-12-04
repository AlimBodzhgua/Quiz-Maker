import { QuestionService } from '@/services/QuestionService';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UniqueIdentifier } from '@dnd-kit/core';
import { IAnswerForm, IQuestion, IQuestionForm } from 'types/types';
import { changeListOrder, create24CharId, removeItemAndFixListOrder } from '@/utils/utils';
import { QUIZ_LOCALSTORAGE_KEY } from '@/constants/localStorage';

interface CreateQuizState {
	quizId: string | null;
	questions: IQuestionForm[];
	savedQuestionsAmount: number;
}

interface CreateQuizActions {
	initQuiz: (quizId: string) => void;
	resetQuiz: () => void;
	createQuestion: () => IQuestionForm;
	addQuestion: () => void;
	removeQuestion: (questionId: string) => void;
	questionsDragEnd: (overId: UniqueIdentifier, activeId: UniqueIdentifier) => void;
	saveQuestion: (question: Omit<IQuestion, 'quizId'>, questionAnswers: IAnswerForm[]) => Promise<void>;
}

export const useCreateQuiz = create<CreateQuizState & CreateQuizActions>()(
	devtools((set, get) => ({
		quizId: null,
		questions: [],
		savedQuestionsAmount: 0,

		initQuiz: (quizId) => {
			localStorage.setItem(QUIZ_LOCALSTORAGE_KEY, quizId);
			set({ quizId }, false, 'initQuiz');
		},

		resetQuiz: () => {
			localStorage.removeItem(QUIZ_LOCALSTORAGE_KEY);
			set({ quizId: null, questions: [], savedQuestionsAmount: 0 }, false, 'resetQuiz');
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