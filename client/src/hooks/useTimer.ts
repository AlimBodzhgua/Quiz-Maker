import { TimerLimit } from '@/types/timer';
import { useEffect, useRef, useState } from 'react';

interface CreateTimerFnReturn {
	minutes: number;
	seconds: number;
	isRunning: boolean;
	start: () => void;
	pause: () => void;
	resume: () => void;
	restart: () => void;
}

export interface IncreasingTimerProps {
	type: 'increasing';
	limit?: TimerLimit;
}

export interface DecreasingTimerProps {
	type: 'decreasing'
	limit: TimerLimit;
}

type TimerProps = IncreasingTimerProps | DecreasingTimerProps;


export const useTimer = (props: TimerProps): CreateTimerFnReturn => {
	const {
		limit,
		type = 'increasing',
	} = props;
	const [minutes, setMinutes] = useState<number>(0);
	const [seconds, setSeconds] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (type === 'decreasing') {
			setMinutes(limit!.minutes);
			setSeconds(limit!.seconds);
		}
	}, [type]);

	useEffect(() => {
		if (isRunning) {
			timerRef.current = setInterval(() => {
				type === 'increasing' ? setSeconds((prev) => prev + 1) : setSeconds((prev) => prev - 1);
			}, 1000);

			if (type === 'increasing') {

				if (seconds >= 60) {
					setMinutes((prev) => prev + 1);
					setSeconds(0);
				}
				
				if (limit && minutes >= limit.minutes && seconds >= limit.seconds) {
					clearInterval(timerRef.current);
				}
			} else {

				if (seconds <= 0 && minutes > 0) {
					setMinutes((prev) => prev - 1);
					setSeconds(59);
				};

				if (seconds === 0 && minutes === 0) {
					clearInterval(timerRef.current);
				};
			}
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [seconds, isRunning]);

	const start = () => {
		setIsRunning(true);
	};

	const pause = () => {
		setIsRunning(false);
	};

	const resume = () => {
		setIsRunning(true);
	};

	const restart = () => {
		if (type === 'increasing') {
			setMinutes(0);
			setSeconds(0);
		} else {
			setMinutes(limit!.minutes);
			setSeconds(limit!.seconds);
		}
	};

	return {
		minutes,
		seconds,
		isRunning,
		start,
		pause,
		resume,
		restart,
	};
};