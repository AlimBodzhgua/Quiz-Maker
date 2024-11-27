import { FC, memo, useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';
import { useDebounce } from '@/hooks/useDebounce';
import { useHover } from '@/hooks/useHover';
import { IAnswerForm } from 'types/types';
import { SortableItem } from '@/lib/components/SortableItem';

interface AddAnswerFormProps {
	onChangeIsCorrect: (answerId: string) => void;
	onChangeValue: (answerId: string, value: string) => void;
	onDeleteAnswer: (answerId: string) => void;
	answer: IAnswerForm;
	isSaved: boolean;
}

export const AddAnswerForm: FC<AddAnswerFormProps> = memo((props) => {
	const {
		answer,
		isSaved,
		onChangeIsCorrect,
		onChangeValue,
		onDeleteAnswer,
	} = props;

	const [isHover, hoverProps] = useHover();
	const [value, setValue] = useState<string>(answer.value);
	const debouncedValue = useDebounce(value);
	const showActionButtons = isHover && !isSaved;
	
	useEffect(() => {
		onChangeValue(answer._id, debouncedValue);
	}, [debouncedValue])

	const handleOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}

	const handleIsCorrect = () => {
		onChangeIsCorrect(answer._id);
	}

	const handleDeleteAnswer = () => {
		onDeleteAnswer(answer._id);
	}

	return (
		<SortableItem id={answer._id}>
			<Flex
				direction='column'
				bg='whiteAlpha.900'
				borderRadius='base'
				gap='6px'
				p='5px 8px'
				m='5px 0 5px 40px'
				{...hoverProps}
			>
				<InputGroup>
					<Input
						placeholder='Answer'
						value={value}
						onChange={handleOnChangeValue}
						disabled={isSaved}
					/>
					{showActionButtons && (
						<InputRightElement w='none'>
							<Flex>
								<Button
									onClick={handleDeleteAnswer}
									variant='unstyled'
									_hover={{ color: 'red.500' }}
									size='sm'
								>
									<DeleteIcon />
								</Button>
								<Button
									variant='unstyled'
									_hover={{ color: 'blue.500', cursor: 'grab' }}
									size='sm'
								>
									<DragHandleIcon />
								</Button>
							</Flex>
						</InputRightElement>
					)}
				</InputGroup>
				<Checkbox
					isChecked={answer.isCorrect}
					onChange={handleIsCorrect}
					disabled={isSaved}
					_hover={{ color: 'blue.200' }}
					size='sm'
					alignSelf='flex-end'
				>
					correct answer
				</Checkbox>
			</Flex>
		</SortableItem>
	);
});
