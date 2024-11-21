import { FC, memo } from 'react';
import { IAnswer } from 'types/types';
import { getDataMatchedAnswer } from '@/utils/utils';
import { Flex, Radio } from '@chakra-ui/react';

interface RadioButtonItemProps {
	answer: IAnswer;
	isAnswerSubmit: boolean;
}

export const RadioButtonItem: FC<RadioButtonItemProps> = memo((props) => {
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
			<Radio value={answer._id.concat(':' + String(answer.isCorrect))}>
				{answer.value}
			</Radio>
			{isAnswerSubmit && getDataMatchedAnswer(answer.isCorrect).icon}
		</Flex>

	)
})

