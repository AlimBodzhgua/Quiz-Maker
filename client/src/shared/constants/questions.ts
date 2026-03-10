export const QuestionTypes = {
	multipleAnswer: 'multipleAnswer',
	oneAnswer: 'oneAnswer',
	inputAnswer: 'inputAnswer',
	trueOrFalse: 'trueOrFalse',
} as const;


export const QuestionTypesDisplay = {
	multipleAnswer: 'quiz_create.answer.type.multiple',
	oneAnswer: 'quiz_create.answer.type.single',
	inputAnswer: 'quiz_create.answer.type.input',
	trueOrFalse: 'quiz_create.answer.type.true_false',
} as const;
