import { FC, memo } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { Answer } from '../../../model/types';
import { Answer as AnswerComponent } from 'shared/UI';

interface CheckBoxItemProps {
	answer: Answer;
	isAnswerSubmit: boolean;
}

export const CheckboxItem: FC<CheckBoxItemProps> = memo((props) => {
	const { answer, isAnswerSubmit } = props;

	return (
		<AnswerComponent isCorrect={answer.isCorrect} isSubmit={isAnswerSubmit}>
			<Checkbox value={answer._id.concat(String(':' + answer.isCorrect))} w='100%'>
				{answer.value}
			</Checkbox>
		</AnswerComponent>
	);
})