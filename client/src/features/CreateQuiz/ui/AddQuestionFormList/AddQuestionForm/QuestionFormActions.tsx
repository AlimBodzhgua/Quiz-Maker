import type { FC } from 'react';
import { DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Flex, ScaleFade } from '@chakra-ui/react';
import { memo } from 'react';

interface QuestionFormActionsProps {
    isSaved: boolean;
	isHover: boolean;
    onRemove: () => void;
    onEdit: () => void;
}

export const QuestionFormActions: FC<QuestionFormActionsProps> = memo((props) => {
	const {
		isSaved,
		isHover,
		onRemove,
		onEdit,
	} = props;

    return (
        <Flex
	direction='column'
	borderRadius='base'
	bg='blue.400'
	position='absolute'
	right='5px'
	top='0'
        >
            <ScaleFade in={isHover}>
                <Flex
	direction='column'
	position='absolute'
	gap='10px'
	bg='blue.400'
	p='10px 8px'
                >
                    <Button onClick={onRemove} size='sm'>
                        <DeleteIcon />
                    </Button>
                    <Button size='sm' cursor='grab'>
                        <DragHandleIcon />
                    </Button>
                    {isSaved && (
                        <Button size='sm' onClick={onEdit}>
                            <EditIcon />
                        </Button>
                    )}
                </Flex>
            </ScaleFade>
        </Flex>
    );
});
