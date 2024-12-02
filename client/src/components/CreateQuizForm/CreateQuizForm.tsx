import { FC, memo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Flex, Input, InputGroup, InputRightAddon, Tooltip, useDisclosure } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon, SettingsIcon } from '@chakra-ui/icons';
import { useHover } from '@/hooks/useHover';
import { getQueryParam } from '@/utils/utils';
import { useQuizzesStore } from 'store/quizzes';
import { AppDialog } from '../UI/AppDialog/AppDialog';
import { SettingsModal } from '../SettingsModal/SettingsModal';
import { QUIZ_LOCALSTORAGE_KEY } from '@/constants/localStorage';

export const CreateQuizForm: FC = memo(() => {
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
	const createQuiz = useQuizzesStore((state) => state.createQuiz);
	const removeQuiz = useQuizzesStore((state) => state.removeQuiz);
	const updateQuiz = useQuizzesStore((state) => state.updateQuiz);
	const navigate = useNavigate();
	const location = useLocation();
	const isSmallLength = title.length <= 3;

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	
	const onEdit = () => setIsSaved(false);

	const onSaveQuiz = async () => {
		let quizId = getQueryParam('id');
		setIsLoading(true);

		if (quizId.length) {
			await updateQuiz(quizId, { title });
		} else {
			const quiz = await createQuiz(title);
			quizId = quiz!._id;
		}

		//navigate(location.pathname + `?id=${quizId}`, { replace: true, state: { id: quizId } });
		localStorage.setItem(QUIZ_LOCALSTORAGE_KEY, quizId);
		setIsLoading(false);
		setIsSaved(true);
	};

	const onRemove = async () => {
		const quizId = getQueryParam('id');
		await removeQuiz(quizId);
		onClose();
		navigate('/');
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
				<Button onClick={onOpenSettingsModal} ml='5px' disabled={!isSaved}>
					<SettingsIcon />
				</Button>
				<SettingsModal isOpen={isSettingsModalOpen} onClose={onCloseSettingsModal}/>
			</InputGroup>
		</Flex>
	);
});
