import { Flex, Input } from '@chakra-ui/react';
import { QuestionType } from 'entities/Quiz';
import { ChangeEvent, FC, memo } from 'react';
import { QuestionTypeSelector } from '../../QuestionTypeSelector/QuestionTypeSelector';

interface QuestionHeaderProps {
    title: string;
    questionType: QuestionType;
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    isSaved: boolean;
}

export const QuestionHeader: FC<QuestionHeaderProps> = memo((props) => {
	const {
		title,
		questionType,
		onTitleChange,
		onTypeChange,
		isSaved,
	} = props;

	return (
		<Flex gap='10px'>
			<Input
				value={title}
				onChange={onTitleChange}
				disabled={isSaved}
				placeholder='Question title'
				bg='whiteAlpha.900'
				w='75%'
				mb='8px'
			/>
			<QuestionTypeSelector
				value={questionType}
				onChange={onTypeChange}
				disabled={isSaved}
			/>
		</Flex>
	);
});