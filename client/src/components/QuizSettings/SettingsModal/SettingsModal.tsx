import { FC, memo } from 'react';
import {
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { TimerSettings } from '../TimerSettings/TimerSettings';
import { PrivacySettings } from '../PrivacySettings/PrivacySettings';

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const SettingsModal: FC<SettingsModalProps> = memo((props) => {
	const { isOpen, onClose } = props;
	

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent minW='475px'>
				<ModalHeader>Settings</ModalHeader>
				<ModalBody>
					<TimerSettings />
					<Divider mb='10px'/>
					<PrivacySettings />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
});
