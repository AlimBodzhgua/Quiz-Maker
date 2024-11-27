import { FC, memo } from 'react';
import { IAnswer } from 'types/types';
import { ListItem } from '@chakra-ui/react';

interface AnswersItemProps {
	answer: IAnswer;
}

export const AnswersItem: FC<AnswersItemProps> = memo(({answer}) => {
	return (
		<ListItem>
			{answer.value};
		</ListItem>
	)
});
