import { FC, memo } from 'react';
import { questionTypes } from '@/constants/questions';
import { QuestionType } from 'types/types';
import { capitalizeFirstLetter, splitCamelCaseLetter } from '@/utils/utils';
import { Select } from '@chakra-ui/react';

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
				<option value={type} key={type}>{splitCamelCaseLetter(capitalizeFirstLetter(type))}</option>
			))}
		</Select>
	)
})