import { FC, memo } from 'react';
import {
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { Quiz } from 'entities/Quiz';
import { TimerSettings } from '../TimerSettings/TimerSettings';
import { PrivacySettings } from '../PrivacySettings/PrivacySettings';

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
	onUpdate: (quiz: Partial<Quiz>) => Promise<Quiz>;
}

export const SettingsModal: FC<SettingsModalProps> = memo((props) => {
	const {
		isOpen,
		onClose,
		onUpdate,
	} = props;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent minW='540px' minH='460px'>
				<ModalHeader>Settings</ModalHeader>
				<ModalBody>
					<TimerSettings onUpdate={onUpdate}/>
					<Divider mb='10px'/>
					<PrivacySettings onUpdate={onUpdate}/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
});
