import type { FC } from 'react';
import { TimeIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { memo } from 'react';
import { subtractPixelsFromString } from '../../utils/utils';

type TimerSize = 'sm' | 'md' | 'lg';

const timerSizes: Record<TimerSize, string> = {
	sm: '12px',
	md: '17px',
	lg: '21px',
};

interface TimerProps {
	minutes: number;
	seconds: number;
	size?: TimerSize;
	color?: string;
};

export const Timer: FC<TimerProps> = memo((props) => {
	const {
		minutes,
		seconds,
		size = 'md',
		color = 'white',
	} = props;

	return (
		<Flex
			gap='6px'
			color={color}
			alignItems='center'
			fontSize={timerSizes[size]}
		>
			<TimeIcon fontSize={subtractPixelsFromString(timerSizes[size], 2)} />
			{`${minutes <= 9 ? `0${minutes}` : minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`}
		</Flex>
	);
});
