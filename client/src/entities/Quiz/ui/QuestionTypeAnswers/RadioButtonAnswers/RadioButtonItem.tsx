import type { FC } from 'react';
import type { Answer } from '../../../model/types';
import { Radio } from '@chakra-ui/react';
import { memo } from 'react';
import { Answer as AnswerComponent } from 'shared/UI';

interface RadioButtonItemProps {
	answer: Answer;
	isAnswerSubmit: boolean;
}

export const RadioButtonItem: FC<RadioButtonItemProps> = memo((props) => {
	const { answer, isAnswerSubmit } = props;

	return (
		<AnswerComponent isCorrect={answer.isCorrect} isSubmit={isAnswerSubmit}>
			<Radio value={answer._id.concat(`:${String(answer.isCorrect)}`)} w='100%'>
				{answer.value}
			</Radio>
		</AnswerComponent>
	);
});
