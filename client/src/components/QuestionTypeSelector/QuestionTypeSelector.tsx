import { questionTypes } from '@/constants/questions';
import { QuestionType } from '@/types/types';
import { Select } from '@chakra-ui/react';
import { FC, memo } from 'react';

interface QuestionTypeSelectorProps {
	value: QuestionType;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
	disabled?: boolean;
}

export const QuestionTypeSelector: FC<QuestionTypeSelectorProps> = memo((props) => {
	const {
		value,
		disabled,
		onChange,
	} = props;

	return (
		<Select
			value={value}
			onChange={onChange}
			disabled={disabled}
			w='25%'
			bg='whiteAlpha.900'
		>
			{Object.values(questionTypes).map((type) => (
				<option value={type} key={type}>{type}</option>
			))}
		</Select>
	)
})