import { useState, useRef, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number = 350) => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setDebouncedValue(value);
		}, delay)

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		}
	}, [value, delay])

	return debouncedValue;
}