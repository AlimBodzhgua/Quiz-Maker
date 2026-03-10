import type { FC } from 'react';
import { Progress, Text } from '@chakra-ui/react';
import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface QuizProgressBarProps {
	currentValue: number;
	maxValue: number;
}

export const QuizProgressBar: FC<QuizProgressBarProps> = memo((props) => {
	const { currentValue, maxValue } = props;
	const { t } = useTranslation();

	return (
		<Fragment>
			<Text mr='10px'>
				{t('current_quiz.title')}: {currentValue} / {maxValue}
			</Text>
			<Progress
				value={currentValue}
				max={maxValue}
				colorScheme='cyan'
				borderRadius='full'
				w='40%'
			/>
		</Fragment>
	);
});
