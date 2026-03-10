import type { FC } from 'react';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppDialog } from 'shared/UI';

interface PrivateLinkDialogProps {
	isOpen: boolean;
}

export const PrivateLinkDialog: FC<PrivateLinkDialogProps> = memo((props) => {
	const { isOpen } = props;
	const { t } = useTranslation();
	const navigate = useNavigate();

	const onCloseDialog = () => navigate('/');

	return (
		<AppDialog
			header={t('quiz_privacy.access_messages.requires_link')}
			body={t('quiz_privacy.access_messages.no_permission')}
			actionText='ok'
			isOpen={isOpen}
			actionHandler={onCloseDialog}
			onClose={onCloseDialog}
		>
		</AppDialog>
	);
});
