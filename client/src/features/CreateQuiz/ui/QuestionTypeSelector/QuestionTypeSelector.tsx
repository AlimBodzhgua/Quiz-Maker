import type { QuestionType } from 'entities/Quiz';
import type { FC } from 'react';

import { Select } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { QuestionTypes } from 'shared/constants';

import { capitalizeFirstLetter, splitCamelCaseLetter } from '../../lib/utils';

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
	const { t } = useTranslation();

	return (
		<Select
			value={value}
			onChange={onChange}
			disabled={disabled}
			w='25%'
			bg='whiteAlpha.900'
		>
			{Object.values(QuestionTypes).map((type) => (
				<option value={type} key={type}>
					{t(`${splitCamelCaseLetter(capitalizeFirstLetter(type))}`)}
				</option>
			))}
		</Select>
	);
});
