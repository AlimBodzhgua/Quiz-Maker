import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { AppDialog } from 'shared/UI';

interface RestrictedAccessDialogProps {
	havePermission: boolean;
}

export const RestrictedAccessDialog: FC<RestrictedAccessDialogProps> = (props) => {
	const { havePermission } = props;
	const { t } = useTranslation();
	const navigate = useNavigate();

	const onCloseDialog = () => navigate('/');

	return (
		<AppDialog
			header={t('Restricted Access')}
			body={t('You have no permission to this test. Your not added to restricted users list')}
			actionText='ok'
			actionHandler={onCloseDialog}
			isOpen={!havePermission}
			onClose={onCloseDialog}
		/>
	);
};
