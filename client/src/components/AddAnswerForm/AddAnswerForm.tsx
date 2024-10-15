import { Checkbox, Flex, Input } from '@chakra-ui/react';
import { FC, memo, useState } from 'react';


export const AddAnswerForm: FC = memo(() => {
	const [isCorrect, setIsCorrect] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');

	const toggleIsCorrect = () => setIsCorrect((prev) => !prev);

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}

	return (
		<Flex
			direction='column'
			bg='whiteAlpha.900'
			borderRadius='base'
			gap='6px'
			p='5px 8px'
			m='5px 0 5px 40px'
		>
			<Input
				placeholder='Answer'
				value={value}
				onChange={onChangeValue}
			/>
			<Checkbox
				checked={isCorrect}
				onChange={toggleIsCorrect}
				_hover={{ color: 'blue.200' }}
				size='sm'
				alignSelf='flex-end'
			>
				correct answer
			</Checkbox>
		</Flex>
	);
});
