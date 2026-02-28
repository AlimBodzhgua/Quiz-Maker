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
				title: t('Wrong password'),
				position: 'top',
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
		}
	};

	return (
		<AppDialog
			header={t('This quiz requires a password')}
			body={(
				<Input
					placeholder={t('Enter password')}
					value={password}
					onChange={onChangePassword}
				/>
			)}
			actionText={t('submit')}
			actionHandler={onSubmitPassword}
			isOpen={isOpen}
			onClose={onCloseDialog}
		/>
	);
};
