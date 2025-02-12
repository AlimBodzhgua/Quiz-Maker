import { FC, Fragment, memo } from 'react';
import { Progress, Text } from '@chakra-ui/react';

interface QuizProgressBarProps {
	currentValue: number;
	maxValue: number;
}

export const QuizProgressBar: FC<QuizProgressBarProps> = memo((props) => {
	const { currentValue, maxValue } = props;

	return (
		<Fragment>
			<Text mr='10px'>
				Quesetions: {currentValue} / {maxValue}
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