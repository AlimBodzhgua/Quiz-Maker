import { FC, memo } from 'react';
import { Flex } from '@chakra-ui/react';
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	MailruIcon,
	MailruShareButton,
	TelegramIcon,
	TelegramShareButton,
	VKIcon,
	VKShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from 'react-share';

interface SocialListProps {
	link: string;
}

export const SocialList: FC<SocialListProps> = memo(({ link }) => {

	return (
		<Flex gap='4px'>
			<VKShareButton url={link}>
				<VKIcon size='30px' />
			</VKShareButton>
			<FacebookShareButton url={link}>
				<FacebookIcon size='30px' />
			</FacebookShareButton>
			<EmailShareButton url={link}>
				<EmailIcon size='30px' />
			</EmailShareButton>
			<MailruShareButton url={link}>
				<MailruIcon size='30px' />
			</MailruShareButton>
			<TelegramShareButton url={link}>
				<TelegramIcon size='30px' />
			</TelegramShareButton>
			<WhatsappShareButton url={link}>
				<WhatsappIcon size='30px' />
			</WhatsappShareButton>
		</Flex>
	);
});