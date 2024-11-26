import { FC, memo } from 'react';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { TimerSettings } from '../TimerSettings/TimerSettings';

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const SettingsModal: FC<SettingsModalProps> = memo((props) => {
	const { isOpen, onClose } = props;
	

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Settings</ModalHeader>
				<ModalBody>
					<TimerSettings />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
});
