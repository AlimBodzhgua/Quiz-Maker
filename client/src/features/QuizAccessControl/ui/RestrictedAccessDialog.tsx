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
			header={t('quiz_privacy.access_messages.restricted_title')}
			body={t('quiz_privacy.access_messages.not_in_list')}
			actionText='ok'
			actionHandler={onCloseDialog}
			isOpen={!havePermission}
			onClose={onCloseDialog}
		/>
	);
};
