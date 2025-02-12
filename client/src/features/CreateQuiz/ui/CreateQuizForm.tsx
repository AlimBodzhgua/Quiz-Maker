import { FC, memo, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Input, InputGroup, InputRightAddon, Tooltip, useDisclosure } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon, SettingsIcon } from '@chakra-ui/icons';
import { useHover } from 'shared/lib/hooks';
import { getQueryParam } from 'shared/utils/utils';
import { Quiz, useQuizzesStore } from 'entities/Quiz';
import { AppDialog } from 'shared/UI/AppDialog/AppDialog';
import { useCreateQuiz } from '../model/store';

type QuizSettingsManagerParams = {
	isOpen: boolean;
	onClose: () => void;
	onUpdate: (quiz: Partial<Quiz>) => Promise<Quiz>;
}

interface CreateQuizFormProps {
	renderQuizSettingsManager: (params: QuizSettingsManagerParams) => ReactNode;
}

export const CreateQuizForm: FC<CreateQuizFormProps> = memo((props) => {
	const { renderQuizSettingsManager } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isSettingsModalOpen,
		onOpen: onOpenSettingsModal,
		onClose: onCloseSettingsModal,
	} = useDisclosure();
	const [title, setTitle] = useState<string>('');
	const [isSaved, setIsSaved] = useState<boolean>(false);
	const [isHover, hoverProps] = useHover();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const createQuiz = useCreateQuiz((state) => state.createQuiz);
	const updateQuiz = useCreateQuiz((state) => state.updateQuiz);
	const removeQuiz = useQuizzesStore((state) => state.removeQuiz);
	const navigate = useNavigate();
	const quizId = useCreateQuiz((state) => state.quizId);
	const isSmallLength = title.length <= 3;

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	
	const onEdit = () => setIsSaved(false);

	const onSaveQuiz = async () => {
		const quizId = getQueryParam('id');
		setIsLoading(true);

		if (quizId.length) {
			await updateQuiz({ title });
		} else {
			await createQuiz(title);
		}

		setIsLoading(false);
		setIsSaved(true);
	};

	const onRemove = async () => {
		if (quizId) {
			await removeQuiz(quizId);
			onClose();
			navigate('/');
		}
	};

	return (
		<Flex gap='15px' {...hoverProps}>
			<InputGroup>
				<Input
					placeholder='Quiz title...'
					value={title}
					onChange={onTitleChange}
					disabled={isSaved}
				/>
				<InputRightAddon
					maxW='15%'
					w='100%'
					display='flex'
					justifyContent='center'
				>
					{isSaved && isHover ? (
						<Flex justify='center' align='flex-start' width='100%'>
							<Button size='sm' onClick={onEdit} _hover={{ color: 'blue.500' }}>
								<EditIcon />
							</Button>
							<AppDialog
								headerText='Delete quiz'
								bodyText='Are you sure you want to delete quiz?'
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
								onClick={onSaveQuiz}
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
				<Button onClick={onOpenSettingsModal} disabled={!isSaved} ml='5px'>
					<SettingsIcon />
				</Button>
				{renderQuizSettingsManager({
					isOpen: isSettingsModalOpen,
					onClose: onCloseSettingsModal,
					onUpdate: updateQuiz
				})}
				{/* <SettingsModal isOpen={isSettingsModalOpen} onClose={onCloseSettingsModal}/> */}
			</InputGroup>
		</Flex>
	);
});
