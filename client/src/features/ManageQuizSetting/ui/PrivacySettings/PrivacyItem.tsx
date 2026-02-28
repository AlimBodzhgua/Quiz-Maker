import type { PrivacyTypeValue } from 'entities/Quiz';
import type { FC } from 'react';

import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { Flex, Radio, Tooltip } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { mapToPrivacyLabelText, mapToPrivacyText, PrivacyValues } from 'shared/constants';

interface PrivacyItemProps {
	privacy: PrivacyTypeValue;
}

export const PrivacyItem: FC<PrivacyItemProps> = memo((props) => {
	const { privacy } = props;
	const { t } = useTranslation();

	return (
		<Flex alignItems='center'>
			<Radio value={PrivacyValues[privacy]} mr='10px'>
				{t(`${mapToPrivacyText[privacy]}`)}
			</Radio>
			<Tooltip
				label={t(`${mapToPrivacyLabelText[privacy]}`)}
				placement='right'
				bgColor='bg.primary'
				color='text.secondary'
				maxW='250px'
				hasArrow
			>
				<QuestionOutlineIcon
					color='#b1b1b1'
					fontWeight='bold'
					fontSize='14px'
					_hover={{ cursor: 'pointer' }}
				/>
			</Tooltip>
		</Flex>
	);
});
