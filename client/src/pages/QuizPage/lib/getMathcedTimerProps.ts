import { TimerLimit } from 'entities/Quiz/model/types';

export interface IncreasingTimerProps {
	type: 'increasing';
	limit?: TimerLimit;
}

export interface DecreasingTimerProps {
	type: 'decreasing';
	limit: TimerLimit;
}

export const getMathcedTimerProps = (timerLimit?: TimerLimit) => {
	const type = timerLimit ? 'decreasing' : 'increasing';

	return type === 'increasing'
		? { type: 'increasing' } as IncreasingTimerProps
		: { type: 'decreasing', limit: timerLimit } as DecreasingTimerProps; 
}