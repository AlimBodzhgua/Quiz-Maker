import { FC, memo, ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Input, InputGroup, InputRightAddon, Tooltip, useDisclosure } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon, SettingsIcon } from '@chakra-ui/icons';
import { useHover } from 'shared/lib/hooks';
import { getQueryParam } from 'shared/utils';
import { Quiz, useQuizzesStore } from 'entities/Quiz';
import { AppDialog } from 'shared/UI';
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
	const { isHover, hoverProps } = useHover();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const createQuiz = useCreateQuiz((state) => state.createQuiz);
	const updateQuiz = useCreateQuiz((state) => state.updateQuiz);
	const removeQuiz = useQuizzesStore((state) => state.removeQuiz);
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement | null>(null)
	const quizId = useCreateQuiz((state) => state.quizId);
	const isSmallLength = title.length <= 3;

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	
	const onEdit = () => setIsSaved(false);

	const onRemove = async () => {
		if (quizId) {
			await removeQuiz(quizId);
			onClose();
			navigate('/');
		}
	};

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

	const onPressEnter = (e: KeyboardEvent) => {
		const isFocued = document.activeElement === inputRef.current;
		if (e.key === 'Enter' && isFocued) {
			onSaveQuiz();
		} else if (e.key === 'Escape' && isFocued) {
			inputRef.current?.blur();
		}
	};
	
	useEffect(() => {
		window.addEventListener('keydown', onPressEnter);

		return () => window.removeEventListener('keydown', onPressEnter);
	}, [onPressEnter]);

	return (
		<Flex gap='15px' {...hoverProps}>
			<InputGroup>
				<Input
					placeholder='Quiz title...'
					value={title}
					onChange={onTitleChange}
					disabled={isSaved}
					ref={inputRef}
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
								header='Delete quiz'
								body='Are you sure you want to delete quiz?'
								actionText='delete'
								isOpen={isOpen}
								onClose={onClose}
								actionHandler={onRemove}
							>
								<Button
									size='sm'
									onClick={onOpen}
									_hover={{ color: 'red.400' }}
								>
									<DeleteIcon />
								</Button>
							</AppDialog>
						</Flex>
					) : (
						<Tooltip
							hasArrow
							placement='bottom'
							isDisabled={!isSmallLength}
							label='Title must be at least 4 characters long'
						>
							<Button
								onClick={onSaveQuiz}
								disabled={isSaved || isSmallLength}
								isLoading={isLoading}
								
							>
								{isSaved ? (
									<Flex gap='5px' align='center'>
										Saved <CheckIcon fontSize='14px' />
									</Flex>
								) : (
									'Save'
								)}
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
					onUpdate: updateQuiz,
				})}
			</InputGroup>
		</Flex>
	);
});
