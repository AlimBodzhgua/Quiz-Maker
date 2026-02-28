import type { Quiz } from 'entities/Quiz';
import type { FC } from 'react';

import {
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { PrivacySettings } from '../PrivacySettings/PrivacySettings';
import { TimerSettings } from '../TimerSettings/TimerSettings';

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
	const { t } = useTranslation();

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay bgColor='overlay.primary' />
			<ModalContent minW='540px' minH='460px' bgColor='bg.secondary'>
				<ModalHeader>{t('Settings')}</ModalHeader>
				<ModalBody>
					<TimerSettings onUpdate={onUpdate} />
					<Divider mb='10px' />
					<PrivacySettings onUpdate={onUpdate} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
});
