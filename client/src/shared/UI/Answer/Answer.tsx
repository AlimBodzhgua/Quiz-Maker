import type { FC, ReactNode } from 'react';
import { Flex, SlideFade } from '@chakra-ui/react';
import { memo } from 'react';
import { getDataMatchedAnswer } from '../../utils/utils';

interface AnswerProps {
	isSubmit: boolean;
	isCorrect: boolean;
	children: ReactNode;
}

export const Answer: FC<AnswerProps> = memo((props) => {
	const { children, isSubmit, isCorrect } = props;

	return (
		<Flex
			justifyContent='space-between'
			alignItems='center'
			borderRadius='base'
			p='4px 10px'
			mb='6px'
			w='100%'
			border='1px solid'
			borderColor='border.white'
			transition='.3s linear box-shadow'
			bgColor={isSubmit ? getDataMatchedAnswer(isCorrect).color : 'bg.white'}
			color={isSubmit ? '#fff' : 'blackAlpha.700'}
			_hover={{ boxShadow: '0 6px 6px rgba(16, 81, 185, 0.15)' }}
		>
			{children}
			<SlideFade offsetX='24px' in={isSubmit}>
				{getDataMatchedAnswer(isCorrect).icon}
			</SlideFade>
		</Flex>
	);
});
