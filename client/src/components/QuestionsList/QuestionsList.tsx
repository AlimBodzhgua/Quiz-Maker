import { FC, memo } from 'react';
import { List } from '@chakra-ui/react';
import { QuestionItem } from './QuestionItem';


export const QuestionList: FC = memo(() => {
	
	return (
		<List>
			<QuestionItem />
		</List>
	)
})