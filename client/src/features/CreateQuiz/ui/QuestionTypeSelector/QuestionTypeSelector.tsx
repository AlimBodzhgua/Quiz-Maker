import { FC, memo } from 'react';
import { Select } from '@chakra-ui/react';
import { QuestionTypes } from 'shared/constants';
import type { QuestionType } from 'entities/Quiz';
import { splitCamelCaseLetter } from '../../lib/utils';
import { capitalizeFirstLetter } from '../../lib/utils';

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
			{Object.values(QuestionTypes).map((type) => (
				<option value={type} key={type}>{splitCamelCaseLetter(capitalizeFirstLetter(type))}</option>
			))}
		</Select>
	)
})