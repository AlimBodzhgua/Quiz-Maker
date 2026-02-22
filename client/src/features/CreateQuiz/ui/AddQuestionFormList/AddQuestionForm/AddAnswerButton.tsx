import type { FC } from 'react';

import { Button, Tooltip } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface AddAnswerButtonProps {
	onClick: () => void;
	isDisabled: boolean;
}

export const AddAnswerButton: FC<AddAnswerButtonProps> = memo((props) => {
	const { onClick, isDisabled } = props;
	const { t } = useTranslation();

	return (
		<Tooltip label={isDisabled && 'max answers amount is 5'}>
			<Button
				onClick={onClick}
				disabled={isDisabled}
				alignSelf='flex-end'
				size='sm'
				m='5px 0'
			>
				+ {t('Add answer')}
			</Button>
		</Tooltip>
	);
});
