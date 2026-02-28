import type { QuestionForm } from 'entities/Quiz';
import type { FC } from 'react';

import { Flex, ListItem, Text } from '@chakra-ui/react';
import { useHover } from 'shared/lib/hooks';

interface QuestionsItemProps {
	question: QuestionForm;
}

export const QuestionsItem: FC<QuestionsItemProps> = ({ question }) => {
	const { isHover, hoverProps } = useHover();

	const onScroll = () => {
		const target = document.querySelector(`[data-question-id="${question._id}"]`);

		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<ListItem
			{...hoverProps}
			key={question._id}
			onClick={onScroll}
			role='button'
			borderRadius='base'
			p='8px 6px'
			boxShadow='base'
			bgColor='bg.primary'
			color='blackAlpha.700'
			transition='box-shadow .2s linear'
			_hover={{ cursor: 'pointer', boxShadow: 'lg' }}
		>
			<Flex alignItems='center' justifyContent='space-between'>
				<Flex gap='4px' alignItems='center'>
					<Text>{question.order}.</Text>
					<Text>{question.description}</Text>
				</Flex>
				<Text
					justifySelf='end'
					transition='transform .1s ease-in'
					transform={isHover ? 'scale(1)' : 'scale(0)'}
				>
					&#8594;
				</Text>
			</Flex>
		</ListItem>
	);
};
