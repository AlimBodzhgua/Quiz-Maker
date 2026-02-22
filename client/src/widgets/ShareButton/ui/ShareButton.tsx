import type { FC } from 'react';

import {
	Button,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ShareIcon from '../assets/share.svg';
import { SocialList } from './SocialList';

interface ShareButtonProps {
	link: string;
}

export const ShareButton: FC<ShareButtonProps> = memo(({ link }) => {
	const { t } = useTranslation();

	return (
		<Popover>
			<PopoverTrigger>
				<Button
					leftIcon={<ShareIcon />}
					size='xs'
					bgColor='#e6007e'
					bgImage='linear-gradient(to right, #ff512f 0%, #dd2476 51%, #ff512f 100%)'
					color='#ffff'
					_hover={{ color: '#dcd9d9' }}
					_active={{ color: 'none' }}
				>
					{t('Share')}
				</Button>
			</PopoverTrigger>
			<PopoverContent minW='0'w='225px'>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverHeader>{t('Share on Social Media')}</PopoverHeader>
				<PopoverBody>
					<SocialList link={link} />
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
});
