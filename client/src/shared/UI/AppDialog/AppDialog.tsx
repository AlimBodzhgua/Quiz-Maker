import type { AlertDialogProps } from '@chakra-ui/react';
import type { FC, ReactElement, ReactNode } from 'react';

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface AppDialogProps extends Omit<AlertDialogProps, 'leastDestructiveRef' | 'children'> {
	header: ReactNode;
	body: ReactNode;
	actionText: string;
	isOpen: boolean;
	children?: ReactNode | ReactElement;
	onClose: () => void;
	actionHandler: () => void;
}

export const AppDialog: FC<AppDialogProps> = memo((props) => {
	const {
		header,
		body,
		actionText,
		isOpen,
		children,
		onClose,
		actionHandler,
		...otherProps
	} = props;
	const { t } = useTranslation();
	const cancelRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			{children}
			<AlertDialog
				{...otherProps}
				isOpen={isOpen}
				onClose={onClose}
				leastDestructiveRef={cancelRef}
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							{header}
						</AlertDialogHeader>

						<AlertDialogBody>{body}</AlertDialogBody>

						<AlertDialogFooter>
							<Button onClick={onClose} ref={cancelRef}>
								{t('Cancel')}
							</Button>
							<Button colorScheme='red' onClick={actionHandler} ml={3}>
								{actionText}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
});
