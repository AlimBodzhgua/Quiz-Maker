import { FC, memo, useEffect, useRef, useState } from 'react';
import {
	Card,
	CardBody,
	Text,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Tooltip,
	CardHeader,
	Heading,
	List,
	ListItem,
} from '@chakra-ui/react';
import { CheckIcon, CopyIcon, QuestionIcon } from '@chakra-ui/icons';
import { mapToPrivacyLabelText, mapToPrivacyText } from 'shared/constants';
import type { Quiz } from '../../model/types';

interface PrivacyInfoProps {
	quiz: Quiz;
}

export const PrivacyInfo: FC<PrivacyInfoProps> = memo(({ quiz }) => {
	const [isPasswordCopied, setIsPasswordCopied] = useState<boolean>(false);
	const [isTokenCopied, setIsTokenCopied] = useState<boolean>(false);
	const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setIsPasswordCopied(false);
			setIsTokenCopied(false);
			setIsLinkCopied(false);
		}, 3000);

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isLinkCopied, isTokenCopied, isPasswordCopied]);

	const onCopyPassword = () => {
		if (quiz.privacy.type === 'linkProtected' || quiz.privacy.type === 'publicProtected') {
			navigator.clipboard.writeText(quiz.privacy.password || '');
			setIsPasswordCopied(true);
		}
	};

	const onCopyToken = () => {
		if (quiz.privacy.type === 'linkProtected' || quiz.privacy.type === 'privateLink') {
			navigator.clipboard.writeText(quiz.privacy.token);
			setIsTokenCopied(true);
		}
	};

	const onCopyLink = () => {
		if (quiz.privacy.type === 'linkProtected' || quiz.privacy.type === 'privateLink') {
			const link = `http://localhost:3000/quiz/${quiz._id}?token=${quiz.privacy.token}`;
			navigator.clipboard.writeText(link);
			setIsLinkCopied(true);
		}
	};

	return (
		<Card>
			<CardHeader>
				<Heading size='md' fontWeight='medium' mb='12px'>
					{quiz.title}
				</Heading>
				<Text mb='8px'>Quiz ID: {quiz._id}</Text>
			</CardHeader>
			<CardBody>
				<Flex align='center' gap='10px' mb='10px'>
					<Text>Privacy type: {mapToPrivacyText[quiz.privacy.type]}</Text>
					<Tooltip hasArrow label={mapToPrivacyLabelText[quiz.privacy.type]}>
						<QuestionIcon />
					</Tooltip>
				</Flex>
				{(quiz.privacy.type === 'publicProtected' || quiz.privacy.type === 'linkProtected') && (
					<Flex alignItems='center'>
						<Text w='28%'>Password:</Text>
						<InputGroup>
							<Input
								value={quiz.privacy.password}
								variant='filled'
								size='sm'
								disabled
								_disabled={{ bgColor: 'gray.50' }}
							/>
							<InputRightElement
								onClick={onCopyPassword}
								_hover={{ cursor: 'pointer' }}
							>
								<Tooltip label={isPasswordCopied ? 'copied' : 'copy'}>
									{isPasswordCopied ? <CheckIcon /> : <CopyIcon /> }
								</Tooltip>
							</InputRightElement>
						</InputGroup>
					</Flex>
				)}
				{(quiz.privacy.type === 'privateLink' || quiz.privacy.type === 'linkProtected') && (
					<Flex direction='column' gap='8px'>
						<Flex alignItems='center'>
							<Text w='28%'>Link token:</Text>
							<InputGroup>
								<Input
									value={quiz.privacy.token}
									variant='filled'
									size='sm'
									disabled
									_disabled={{ bgColor: 'gray.50' }}
								/>
									<InputRightElement
										onClick={onCopyToken}
										_hover={{ cursor: 'pointer' }}
									>
										<Tooltip label={isTokenCopied ? 'copied' : 'copy'}>
											{isTokenCopied ? <CheckIcon /> : <CopyIcon /> }
										</Tooltip>
									</InputRightElement>
							</InputGroup>
						</Flex>
						<Flex alignItems='center'>
							<Text w='28%' alignItems='center'>Full Link:</Text>
							<InputGroup>
								<Input
									value={`http://localhost:3000/quiz/${quiz._id}?token=${quiz.privacy.token}`}
									variant='filled'
									size='sm'
									disabled
									_disabled={{ bgColor: 'gray.50' }}
								/>
								<InputRightElement
									onClick={onCopyLink}
									_hover={{ cursor: 'pointer' }}
								>
									<Tooltip label={isLinkCopied ? 'copied' : 'copy'}>
										{isLinkCopied ? <CheckIcon /> : <CopyIcon /> }
									</Tooltip>
								</InputRightElement>
							</InputGroup>
						</Flex>
					</Flex>
				)}
				{quiz.privacy.type === 'restrictedUsers' && (
					<Flex alignItems='center'>
						<Heading
							fontWeight='medium'
							alignSelf='flex-start'
							size='sm'
							mb='5px'
						>
							User ids:
						</Heading>
						<List ml='14px'>
							{quiz.privacy.userIds.map((user) => (
								<ListItem
									bgColor='blackAlpha.100'
									p='4px 6px'
									w='fit-content'
									mb='5px'
									fontSize='14px'
								>
									{user}
								</ListItem>
							))}
						</List>
					</Flex>
				)}
			</CardBody>
		</Card>
	);
});