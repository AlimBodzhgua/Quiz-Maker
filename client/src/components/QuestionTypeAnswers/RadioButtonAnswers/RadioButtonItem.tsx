import { FC, memo } from 'react';
import { IAnswer } from 'types/types';
import { Radio } from '@chakra-ui/react';
import { Answer } from 'components/UI/Answer/Answer';

interface RadioButtonItemProps {
	answer: IAnswer;
	isAnswerSubmit: boolean;
}

export const RadioButtonItem: FC<RadioButtonItemProps> = memo((props) => {
	const { answer, isAnswerSubmit } = props;

	return (
		<Answer isCorrect={answer.isCorrect} isSubmit={isAnswerSubmit}>
			<Radio value={answer._id.concat(':' + String(answer.isCorrect))} w='100%'>
				{answer.value}
			</Radio>
		</Answer>
	);
})

