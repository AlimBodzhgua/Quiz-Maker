import { FC, memo } from 'react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { Flex, Radio, Tooltip } from '@chakra-ui/react';
import { mapToPrivacyLabelText, mapToPrivacyText, PrivacyValues } from 'shared/constants';
import type { PrivacyTypeValue } from 'entities/Quiz';

interface PrivacyItemProps {
	privacy: PrivacyTypeValue;
}

export const PrivacyItem: FC<PrivacyItemProps> = memo((props) => {
	const { privacy } = props;

	return (
		<Flex alignItems='center'>
			<Radio value={PrivacyValues[privacy]} mr='10px'>
				{mapToPrivacyText[privacy]}
			</Radio>
			<Tooltip
				label={mapToPrivacyLabelText[privacy]}
				placement='right'
				bgColor='blackAlpha.900'
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
})