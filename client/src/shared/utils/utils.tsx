import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

export const getQuizPage = (id: string) => `/quiz/${id}`;

export const addQueryParam = (key: string, value: string) => {
	const url = new URL(window.location.href);
	url.searchParams.set(key, value);
	window.history.pushState({}, '', url.toString());
};

export const getQueryParam = (key: string) => {
	const url = new URL(window.location.href);
	return url.searchParams.get(key) || '';
};

export const getDataMatchedAnswer = (isCorrect: boolean) => {
	return {
		color: isCorrect ? '#68AF15' : '#D30000',
		icon: isCorrect
? (
			<CheckIcon fontSize='12px' color='#fff' />
		)
: (
			<CloseIcon fontSize='8px' color='#fff' />
		),
	};
};

export const subtractPixelsFromString = (px: string, amount: number) => {
	return `${Number(px.substring(0, px.length - 2)) - amount}px`;
};
