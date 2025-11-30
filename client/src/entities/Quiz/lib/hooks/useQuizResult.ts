import { useCallback } from 'react';
import { calculatePassedTime } from '../calculatePassedTime';
import { QuizService } from '../../api/QuizService';
import { useCurrentQuiz } from '../../model/store/currentQuiz'

type QuizResultProps = {
	minutes: number;
	seconds: number;
};

export const useQuizResult = (time: QuizResultProps) => {
	const quiz = useCurrentQuiz((state) => state.quiz);
	const quizId = useCurrentQuiz((state) => state.quiz?._id);
	const quizTitle = useCurrentQuiz((state) => state.quiz?.title);
	const correctAnswers = useCurrentQuiz((state) => state.correctAnswers);
	const incorrectAnswers = useCurrentQuiz((state) => state.incorrectAnswers);
	const questions = useCurrentQuiz((state) => state.questions);
	const answeredQuestionIds = useCurrentQuiz((state) => state.answerdQuestionIds);
	const requiredQuestionsIds = questions?.reduce((acc: string[], currentValue) => {
		if (currentValue.isRequired) acc.push(currentValue._id);
		return acc;
	}, []);
	const requiredQuestionsAmount = requiredQuestionsIds?.length;

	const isUserAskedAllRequiredQuestions = () => {
		let answeredRequiredQuestionsAmount = 0;

		answeredQuestionIds.forEach((questionId) => {
			if (requiredQuestionsIds?.includes(questionId)) {
				answeredRequiredQuestionsAmount++;
			}
		})
		if (answeredRequiredQuestionsAmount === requiredQuestionsIds?.length) {
			return true
		} else return false;
	}
	
	const saveQuizResult = useCallback(async () => {
		if (quizId && quizTitle) {
			let timeResult;

			if (quiz?.withTimer) {
				if (quiz.timerLimit) {
					timeResult = calculatePassedTime(quiz.timerLimit, time.minutes, time.seconds);
				} else {
					timeResult = { minutes: time.minutes, seconds: time.seconds };
				}
			}
			
			await QuizService.saveQuizResult({
				quizId: quizId,
				quizTitle: quizId,
				correct: correctAnswers,
				incorrect: incorrectAnswers,
				timeResult,
			})
		}
	}, [incorrectAnswers, correctAnswers])

	return {
		saveQuizResult,
		isUserAskedAllRequiredQuestions,
		correctAnswers,
		incorrectAnswers,
		requiredQuestionsAmount,
	};
}