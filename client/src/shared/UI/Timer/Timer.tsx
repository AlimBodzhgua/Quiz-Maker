import { FC, memo } from 'react';
import { TimeIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { subtractPixelsFromString } from '../../utils/utils';

type TimerSize = 'sm' | 'md' | 'lg';

const timereSizes: Record<TimerSize, string>  = {
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
			fontSize={timereSizes[size]}
		>
			<TimeIcon fontSize={subtractPixelsFromString(timereSizes[size], 2)} />
			{`${minutes <= 9 ? '0' + minutes : minutes}:${seconds <= 9 ? '0' + seconds : seconds}`}
		</Flex>
	);
});