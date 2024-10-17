import { QuestionType } from 'types/types';

export const questionTypes: Record<QuestionType, QuestionType> = {
	multipleAnswer: 'multipleAnswer',
	oneAnswer: 'oneAnswer',
	inputAnswer: 'inputAnswer',
	trueOrFalse: 'trueOrFalse',
} as const;