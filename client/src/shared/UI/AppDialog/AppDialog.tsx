import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogProps,
	Button,
} from '@chakra-ui/react';
import { FC, memo, ReactElement, ReactNode, useRef } from 'react';

interface AppDialogProps extends Omit<AlertDialogProps, 'leastDestructiveRef'> {
	headerText: string;
	bodyText: string;
	actionText: string;
	isOpen: boolean;
	children: ReactNode | ReactElement;
	onClose: () => void;
	actionHandler: () => void;
}

export const AppDialog: FC<AppDialogProps> = memo((props) => {
	const {
		headerText,
		bodyText,
		actionText,
		isOpen,
		children,
		onClose,
		actionHandler,
		...otherProps
	} = props;
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
							{headerText}
						</AlertDialogHeader>

						<AlertDialogBody>{bodyText}</AlertDialogBody>

						<AlertDialogFooter>
							<Button onClick={onClose} ref={cancelRef}>
								Cancel
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
