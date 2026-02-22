import type { FC } from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface SaveButtonProps {
	onClick: () => void;
    isLoading: boolean;
    isSaved: boolean;
}

export const SaveButton: FC<SaveButtonProps> = memo((props) => {
	const { onClick, isLoading, isSaved } = props;
	const { t } = useTranslation();

	return (
		<Button
			mt='8px'
			onClick={onClick}
			disabled={isSaved}
			isLoading={isLoading}
			loadingText='Saving question'
			spinnerPlacement='end'
		>
			{isSaved ? (
				<Flex gap='10px' alignItems='center'>
					{t('Saved')}
					<CheckIcon />
				</Flex>
			) : (
				t('Save question')
			)}
		</Button>
	);
});
