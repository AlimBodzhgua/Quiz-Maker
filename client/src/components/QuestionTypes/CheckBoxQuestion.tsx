import { FC, memo } from 'react';
import { IAnswer } from '@/types/types';
import { Box, Checkbox, CheckboxGroup, Flex } from '@chakra-ui/react';

interface CheckBoxQuestion {
	answers: IAnswer[];
}
// MultipleAnswer
export const CheckBoxQuestion: FC<CheckBoxQuestion> = memo(({answers}) => {

	const onChange = (e: Array<string | number>) => {
		console.log(e)
	}

	return (
		<Box pl='16px'>
			<CheckboxGroup onChange={onChange}>
				<Flex direction='column'>
					{answers.map((answer) => (
						<Checkbox value={answer.value}>{answer.value}</Checkbox>
					))}
				</Flex>
			</CheckboxGroup>
		</Box>
	)
})