import type { FC } from 'react';
import type { PrivacyType } from '../../model/types';
import { LinkIcon, LockIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';
import { memo } from 'react';
import UsersIcon from '../../assets/users.svg';

interface PrivacyIconsProps {
	privacy: PrivacyType;
};

export const PrivacyIcons: FC<PrivacyIconsProps> = memo(({ privacy }) => {
	return (
		<Flex gap='10px' alignItems='center'>
			{(privacy.type === 'privateLink' || privacy.type === 'linkProtected') && (
				<Tooltip label='Quiz available only with link' hasArrow>
					<LinkIcon fontSize='14px' />
				</Tooltip>
			)}
			{(privacy.type === 'publicProtected' || privacy.type === 'linkProtected') && (
				<Tooltip label='Quiz with password' hasArrow>
					<LockIcon fontSize='14px' color='gray.500' />
				</Tooltip>
			)}
			{(privacy.type === 'restrictedUsers') && (
				<Tooltip label='Quiz available for selected users' hasArrow>
					<Flex>
						<UsersIcon />
					</Flex>
				</Tooltip>
			)}
		</Flex>
	);
});
