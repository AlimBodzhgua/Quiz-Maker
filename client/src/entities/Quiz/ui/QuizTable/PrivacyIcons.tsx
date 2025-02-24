import { FC, memo } from 'react';
import { LinkIcon, LockIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';
import { PrivacyType } from '../../model/types';

interface PrivacyIconsProps {
	privacy: PrivacyType;
};

export const PrivacyIcons: FC<PrivacyIconsProps> = memo(({ privacy }) => {

	return (
		<Flex gap='10px'>
			{(privacy.type === 'privateLink' ||  privacy.type === 'linkProtected') && (
				<Tooltip label='Quiz available only with link' hasArrow>
					<LinkIcon fontSize='14px'/>
				</Tooltip>
			)}
			{(privacy.type === 'publicProtected' ||  privacy.type === 'linkProtected') && (
				<Tooltip label='Quiz with password' hasArrow>
					<LockIcon fontSize='14px' color='gray.500'/>
				</Tooltip>
			)}
		</Flex>
	);
});