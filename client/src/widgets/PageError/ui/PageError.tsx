import { FC } from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { ArrowBackIcon, RepeatClockIcon } from '@chakra-ui/icons';

export const PageError: FC = () => {

	const onReload = () => window.location.reload();
	const onBack = () => window.history.back();

	return (
		<Flex justifyContent='center' alignItems='center' direction='column' h='100vh'>
			<Heading size='lg' mb='12px'>
				An unexpected error occured
			</Heading>
			<Heading size='md' mb='16px' fontWeight='medium'>
				Reload the page or try it later
			</Heading>
			<Flex gap='12px'>
				<Button onClick={onBack} leftIcon={<ArrowBackIcon />} colorScheme='blue'>
					Go back
				</Button>
				<Button onClick={onReload} leftIcon={<RepeatClockIcon />} colorScheme='blue'>
					Reload the page
				</Button>
			</Flex>
		</Flex>
	);
}