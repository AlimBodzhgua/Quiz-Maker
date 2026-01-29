import type { QuestionType } from 'entities/Quiz';
import type { ChangeEvent, FC } from 'react';

import { Flex, FormControl, FormLabel, Input, Switch } from '@chakra-ui/react';
import { memo, useId } from 'react';

import { QuestionTypeSelector } from '../../QuestionTypeSelector/QuestionTypeSelector';

interface QuestionHeaderProps {
    title: string;
    questionType: QuestionType;
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	onToggleIsRequired: () => void;
    isSaved: boolean;
	isRequired: boolean;
}

export const QuestionHeader: FC<QuestionHeaderProps> = memo((props) => {
	const {
		title,
		questionType,
		onTitleChange,
		onTypeChange,
		isSaved,
		isRequired,
		onToggleIsRequired,
	} = props;
	const id = useId();

	return (
		<Flex gap='10px' mb='10px'>
			<Input
				value={title}
				onChange={onTitleChange}
				disabled={isSaved}
				placeholder='Question title'
				bg='whiteAlpha.900'
				w='70%'
			/>
			<QuestionTypeSelector
				value={questionType}
				onChange={onTypeChange}
				disabled={isSaved}
			/>
			<FormControl
				display='flex'
				alignItems='center'
				bgColor='whiteAlpha.900'
				borderRadius='base'
				w='fit-content'
				p='0 10px'
				gap='10px'
			>
				<FormLabel htmlFor={`requiredSwitch-${id}`} m='0'>
					Required
				</FormLabel>
				<Switch
					isDisabled={isSaved}
					isChecked={isRequired}
					onChange={onToggleIsRequired}
					id={`requiredSwitch-${id}`}
				/>
			</FormControl>
		</Flex>
	);
});
