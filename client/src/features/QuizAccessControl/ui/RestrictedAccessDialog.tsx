import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDialog } from 'shared/UI';

interface RestrictedAccessDialogProps {
	havePermission: boolean;
}

export const RestrictedAccessDialog: FC<RestrictedAccessDialogProps> = (props) => {
	const { havePermission } = props;
	const navigate = useNavigate();

	const onCloseDialog = () => navigate('/');

	return (
		<AppDialog
			header='Restricted Access'
			body='You have no permission to this test. Your not added to restricted users list.'
			actionText='ok'
			actionHandler={onCloseDialog}
			isOpen={!havePermission}
			onClose={onCloseDialog}
		/>
	);
};