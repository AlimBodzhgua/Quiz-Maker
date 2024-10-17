import { IAnswer } from '@/types/types';
import { Box, Input } from '@chakra-ui/react';
import { FC, memo, useState } from 'react';

interface InputQuestionProps {
	answers: IAnswer[];
}

export const InputQuestion: FC<InputQuestionProps> = memo(({answers}) => {
	const [value, setValue] = useState<string>('');

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}

	return (
		<Box pl='16px'>
			<Input
				value={value}
				onChange={onChangeValue}
				placeholder='Enter your answer here...'
			/>
		</Box>
	)
})