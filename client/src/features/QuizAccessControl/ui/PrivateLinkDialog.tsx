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
			header={t('This quiz requires a private link with token')}
			body={t('You have no permission to this quiz')}
			actionText='ok'
			isOpen={isOpen}
			actionHandler={onCloseDialog}
			onClose={onCloseDialog}
		>
		</AppDialog>
	);
});
