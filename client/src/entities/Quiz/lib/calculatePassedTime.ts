import { TimerLimit } from '../model/types';

export const calculatePassedTime = (timerLimit: TimerLimit, minutes: number, seconds: number) => {
	const totalSeconds = timerLimit.minutes * 60 + timerLimit.seconds;
	const totalSecondsLeft = minutes * 60 + seconds;

	const secondsResult = (totalSeconds - totalSecondsLeft) % 60;
	const minutesResult = Math.floor((totalSeconds - totalSecondsLeft) / 60);
	return { seconds: secondsResult, minutes: minutesResult };
}