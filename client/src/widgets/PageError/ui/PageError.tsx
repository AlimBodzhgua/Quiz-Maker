import type { FC } from 'react';

import { ArrowBackIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/ui/Page';

export const PageError: FC = () => {
	const { t } = useTranslation();
	const onReload = () => window.location.reload();
	const onBack = () => window.history.back();

	return (
		<Page centered>
			<Heading size='lg' mb='12px'>
				{t('errors.unexpected')}
			</Heading>
			<Heading size='md' mb='16px' fontWeight='medium'>
				{t('errors.generic_reload')}
			</Heading>
			<Flex gap='12px'>
				<Button onClick={onBack} leftIcon={<ArrowBackIcon />} colorScheme='blue'>
					{t('buttons.back')}
				</Button>
				<Button onClick={onReload} leftIcon={<RepeatClockIcon />} colorScheme='blue'>
					{t('buttons.reload_page')}
				</Button>
			</Flex>
		</Page>
	);
};
