type TimerValues = 'minutes' | 'seconds';
type TimerLimit = Record<TimerValues, number>;

export type CompletedQuiz = {
	_id: string;
	userId: string;
	quizId: string;
	quizTitle: string;
	correct: number;
	incorrect: number;
	timeResult?: TimerLimit;
	date: string;
};
