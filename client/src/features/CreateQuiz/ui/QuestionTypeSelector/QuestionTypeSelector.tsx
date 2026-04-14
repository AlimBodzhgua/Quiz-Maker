import type { QuestionType } from 'entities/Quiz';
import type { FC } from 'react';

import { Select } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { QuestionTypesDisplay } from 'shared/constants';

interface QuestionTypeSelectorProps {
	value: QuestionType;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	disabled?: boolean;
}

const questionTypeKeys = Object.keys(QuestionTypesDisplay) as Array<keyof typeof QuestionTypesDisplay>;

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
			bg='bg.secondary'
		>
			{questionTypeKeys.map((type) => (
				<option value={type} key={type}>
					{t(QuestionTypesDisplay[type])}
				</option>
			))}
		</Select>
	);
});
