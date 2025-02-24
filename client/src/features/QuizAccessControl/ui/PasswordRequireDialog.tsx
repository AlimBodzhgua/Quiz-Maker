import { ChangeEvent, FC, useState } from 'react';
import { Input, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AppDialog } from 'shared/UI';

interface PasswordRequireDialog {
	correctPassword?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const PassworodRequireDialog: FC<PasswordRequireDialog> = (props) => {
	const {
		correctPassword,
		isOpen,
		onClose,
	} = props;
	const toast = useToast();
	const navigate = useNavigate();
	const [password, setPassword] = useState<string>('');

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}

	const onCloseDialog = () => navigate('/');

	const onSubmitPassword = () => {
		if (password === correctPassword) {
			onClose();
		} else {
			toast({
				title: 'Wrong password',
				position: 'top',
				status: 'error',
				duration: 4000,
				isClosable: true,
			})
		}
	}

	return (
		<AppDialog
			header='This quiz requires a password'
			body={<Input
				placeholder='Enter password'
				value={password}
				onChange={onChangePassword}
			/>}
			actionText='submit'
			actionHandler={onSubmitPassword}
			isOpen={isOpen}
			onClose={onCloseDialog}
		>
		</AppDialog>
	);
};