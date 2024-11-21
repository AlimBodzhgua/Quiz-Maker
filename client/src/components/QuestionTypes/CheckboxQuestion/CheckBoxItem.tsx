import { FC, memo } from 'react';
import { Checkbox, Flex } from '@chakra-ui/react';
import { IAnswer } from 'types/types';
import { getDataMatchedAnswer } from '@/utils/utils';

interface CheckBoxItemProps {
	answer: IAnswer;
	isAnswerSubmit: boolean;
}

export const CheckboxItem: FC<CheckBoxItemProps> = memo((props) => {
	const { answer, isAnswerSubmit } = props;

	return (
		<Flex
			justifyContent='space-between'
			alignItems='center'
			borderRadius='base'
			p='2px 8px'
			mb='4px'
			bgColor={isAnswerSubmit ? getDataMatchedAnswer(answer.isCorrect).color : 'none'}
			color={isAnswerSubmit ? '#fff' : 'black'}
		>
			<Checkbox value={answer._id.concat(String(':' + answer.isCorrect))}>
				{answer.value}
			</Checkbox>
			{isAnswerSubmit && getDataMatchedAnswer(answer.isCorrect).icon}
		</Flex>
	);
})