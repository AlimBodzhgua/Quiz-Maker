import { useCallback, useRef } from 'react';

export const useThrottle = (callback: (...args: unknown[]) => void, delay: number) => {
	const throttleRef  = useRef<boolean>(false);

	const throttleFunc = useCallback((...args: unknown[]) => {
		if (!throttleRef.current) {
			callback(...args);
			throttleRef.current = true;

			setTimeout(() => {
				throttleRef.current = false;
			}, delay);
		}
	}, [callback, delay]);

	return throttleFunc;
}