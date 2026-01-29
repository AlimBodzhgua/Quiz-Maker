export const baseAnswer = {
	_id: crypto.randomUUID(),
	value: '',
	isCorrect: false,
};

export const trueAnswer = {
	_id: crypto.randomUUID(),
	value: 'true',
	isCorrect: false,
	order: 0,
};

export const falseAnswer = {
	_id: crypto.randomUUID(),
	value: 'false',
	isCorrect: false,
	order: 1,
};

export const inputAnswer = {
	_id: crypto.randomUUID(),
	value: '',
	isCorrect: true,
	order: 1,
};
