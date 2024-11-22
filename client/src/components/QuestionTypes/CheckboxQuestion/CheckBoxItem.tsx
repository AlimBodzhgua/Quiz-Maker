import { FC, memo } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { IAnswer } from 'types/types';
import { Answer } from 'components/UI/Answer/Answer';

interface CheckBoxItemProps {
	answer: IAnswer;
	isAnswerSubmit: boolean;
}

export const CheckboxItem: FC<CheckBoxItemProps> = memo((props) => {
	const { answer, isAnswerSubmit } = props;

	return (
		<Answer isCorrect={answer.isCorrect} isSubmit={isAnswerSubmit}>
			<Checkbox value={answer._id.concat(String(':' + answer.isCorrect))} w='100%'>
				{answer.value}
			</Checkbox>
		</Answer>
	);
})