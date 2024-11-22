import { FC, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Input, InputGroup, InputRightAddon, Tooltip, useDisclosure } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useHover } from '@/hooks/useHover';
import { getQueryParam } from '@/utils/utils';
import { useTestsStore } from 'store/tests';
import { AppDialog } from '../UI/AppDialog/AppDialog';

export const CreateTestForm: FC = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [title, setTitle] = useState<string>('');
	const [isSaved, setIsSaved] = useState<boolean>(false);
	const [isHover, hoverProps] = useHover();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const createTest = useTestsStore((state) => state.createTest);
	const removeTest = useTestsStore((state) => state.removeTest);
	const updateTest = useTestsStore((state) => state.updateTest);
	const navigate = useNavigate();
	const isSmallLength = title.length <= 3;

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	
	const onEdit = () => setIsSaved(false);

	const onSaveTest = async () => {
		const testId = getQueryParam('id');
		setIsLoading(true);

		if (testId.length) {
			await updateTest(testId, title);
		} else {
			await createTest(title);
		}

		setIsLoading(false);
		setIsSaved(true);
	};

	const onRemove = async () => {
		const testId = getQueryParam('id');
		await removeTest(testId);
		onClose();
		navigate('/');
	};

	return (
		<Flex gap='10px' {...hoverProps}>
			<InputGroup>
				<Input
					placeholder='Test title...'
					value={title}
					onChange={onTitleChange}
					disabled={isSaved}
				/>
				<InputRightAddon maxW='15%' w='100%' display='flex' justifyContent='center'>
					{isSaved && isHover ? (
						<Flex justify='center' align='flex-start' width='100%'>
							<Button size='sm' onClick={onEdit} _hover={{ color: 'blue.500' }}>
								<EditIcon />
							</Button>
							<AppDialog
								headerText='Delete test'
								bodyText='Are you sure you want to delete test?'
								actionText='delete'
								isOpen={isOpen}
								onClose={onClose}
								actionHandler={onRemove}
							>
								<Button size='sm' onClick={onOpen} _hover={{ color: 'red.400' }}>
									<DeleteIcon />
								</Button>
							</AppDialog>
						</Flex>
					) : (
						<Tooltip label={isSmallLength && 'Title must be at least 4 characters long'}>
							<Button
								onClick={onSaveTest}
								disabled={isSaved || isSmallLength}
								isLoading={isLoading}
							>
								{isSaved
									?	<Flex gap='3px' align='center'>Saved <CheckIcon /></Flex>
									:	'Save'
								}
							</Button>
						</Tooltip>
					)}
				</InputRightAddon>
			</InputGroup>
		</Flex>
	);
});
