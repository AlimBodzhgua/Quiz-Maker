import type { ChangeEvent, FC } from 'react';

import { Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppDialog } from 'shared/UI';

interface PasswordRequireDialogProps {
	correctPassword?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const PasswordRequireDialog: FC<PasswordRequireDialogProps> = (props) => {
	const { correctPassword, isOpen, onClose } = props;
	const { t } = useTranslation();
	const toast = useToast();
	const navigate = useNavigate();
	const [password, setPassword] = useState<string>('');

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onCloseDialog = () => navigate('/');

	const onSubmitPassword = () => {
		if (password === correctPassword) {
			onClose();
		} else {
			toast({
				title: t('toasts.password_require.title'),
				position: 'top',
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
		}
	};

	return (
		<AppDialog
			header={t('quiz_privacy.access_messages.requires_password')}
			body={(
				<Input
					placeholder={t('quiz_privacy.access_messages.enter_password')}
					value={password}
					onChange={onChangePassword}
				/>
			)}
			actionText={t('buttons.submit')}
			actionHandler={onSubmitPassword}
			isOpen={isOpen}
			onClose={onCloseDialog}
		/>
	);
};
