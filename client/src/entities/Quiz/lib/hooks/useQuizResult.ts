import { useCallback } from 'react';
import { calculatePassedTime } from '../calculatePassedTime';
import { QuizService } from '../../api/QuizService';
import { useCurrentQuiz } from '../../model/store/currentQuiz'

type QuizResultProps = {
	minutes: number;
	seconds: number;
};

export const useQuizResult = (time: QuizResultProps) => {
	const correctAnswers = useCurrentQuiz((state) => state.correctAnswers);
	const incorrectAnswers = useCurrentQuiz((state) => state.incorrectAnswers);
	const questionsAmount = useCurrentQuiz((state) => state.questions)?.length;
	const quiz = useCurrentQuiz((state) => state.quiz);
	const quizId = useCurrentQuiz((state) => state.quiz?._id);
	const quizTitle = useCurrentQuiz((state) => state.quiz?.title);

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
	}, [])

	return { saveQuizResult, correctAnswers, incorrectAnswers, questionsAmount };
}