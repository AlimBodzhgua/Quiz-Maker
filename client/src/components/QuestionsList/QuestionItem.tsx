import { ListItem } from '@chakra-ui/react';
import { FC, memo } from 'react';

interface QuestionItemProps {
	question?: string;
}

export const QuestionItem: FC<QuestionItemProps> = memo(({question}) => {

	return (
		<ListItem>ListItem 1</ListItem>
	)
})