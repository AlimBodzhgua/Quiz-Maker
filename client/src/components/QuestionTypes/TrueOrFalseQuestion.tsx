import { IAnswer } from '@/types/types';
import { Box, Flex, Radio, RadioGroup } from '@chakra-ui/react';
import { FC, memo } from 'react';


interface TrueOrFalseQuestionProps {
	answers: IAnswer[];
}

export const TrueOrFalseQuestion: FC<TrueOrFalseQuestionProps> = memo(({answers}) => {

	const onChange = (value: string) => {
		console.log(value);
	}

	return (
		<Box>
			<RadioGroup onChange={onChange} name='trueOrFalse'>
				<Flex direction='column'>
					{answers.map((answer) => (
						<Radio
							value={JSON.stringify(answer.isCorrect)}
							key={answer._id}
						>
							{answer.value}
						</Radio>
					))}
				</Flex>
			</RadioGroup>
		</Box>
	)
});
