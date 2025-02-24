import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDialog } from 'shared/UI';

interface PrivateLinkDialogProps {
	isOpen: boolean;
}

export const PrivateLinkDialog: FC<PrivateLinkDialogProps> = memo((props) => {
	const { isOpen } = props;
	const navigate = useNavigate();

	const onCloseDialog = () => navigate('/');

	return (
		<AppDialog
			header='This quiz requires a private link with token'
			body='You have no permission to this squiz'
			actionText='ok'
			isOpen={isOpen}
			actionHandler={onCloseDialog}
			onClose={onCloseDialog}
		>
		</AppDialog>
	);
});