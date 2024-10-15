import { CheckBoxQuestion } from 'components/QuestionTypes/CheckBoxQuestion';
import { InputQuestion } from 'components/QuestionTypes/InputQuestion';
import { RadioButtonQuestion } from 'components/QuestionTypes/RadioButtonQuestion';
import { QuestionType } from 'types/types';

export const questionTypes: Record<QuestionType, QuestionType> = {
	multipleAnswer: 'multipleAnswer',
	oneAnswer: 'oneAnswer',
	inputAnswer: 'inputAnswer',
} as const;

export const mapStateToQuestionType: Record<QuestionType, JSX.Element> = {
	multipleAnswer: <CheckBoxQuestion />,
	oneAnswer: <RadioButtonQuestion />,
	inputAnswer: <InputQuestion />,
} as const;
