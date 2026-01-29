import type { FC } from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { memo } from 'react';

interface SaveButtonProps {
	onClick: () => void;
    isLoading: boolean;
    isSaved: boolean;
}

export const SaveButton: FC<SaveButtonProps> = memo((props) => {
	const {
		onClick,
		isLoading,
		isSaved,
	} = props;

	return (
		<Button
			mt='8px'
			onClick={onClick}
			disabled={isSaved}
			isLoading={isLoading}
			loadingText='Saving question'
			spinnerPlacement='end'
		>
			{isSaved
? (
				<Flex gap='10px' alignItems='center'>
					Saved
					<CheckIcon />
				</Flex>
			)
: (
				'Save question'
			)}
		</Button>
	);
});
