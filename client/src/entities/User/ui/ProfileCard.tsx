import { FC, memo, useEffect, useRef, useState } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { Page } from 'widgets/Page';
import { useUserStore } from '../model/store';

export const ProfileCard: FC = memo(() => {
	const user = useUserStore((state) => state.user);
	const [isIdCopied, setIsIdCopied] = useState<boolean>(false);
	const [isEmailCopied, setIsEmailCopied] = useState<boolean>(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setIsIdCopied(false);
			setIsEmailCopied(false);
		}, 3000);

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isIdCopied, isEmailCopied]);

	const onCopyId = () => {
		navigator.clipboard.writeText(user?._id || '');
		setIsIdCopied(true);
	};

	const onCopyEmail = () => {
		navigator.clipboard.writeText(user?.email || '');
		setIsEmailCopied(true);
	};

	return (
		<Page centered>
			<Card>
				<CardHeader display='flex' justifyContent='center' pb='0'>
					<Heading size='md'>Profile</Heading>
				</CardHeader>
				<CardBody>
					<Flex direction='column' gap='12px' width='320px'>
						<Text>Id</Text>
						<InputGroup>
							<Input value={user?._id} variant='filled' disabled />
							<Tooltip label={isIdCopied ? 'copied' : 'copy'} hasArrow>
								<InputRightElement
									onClick={onCopyId}
									_hover={{ cursor: 'pointer' }}
								>
									{isIdCopied ? <CheckIcon /> : <CopyIcon />}
								</InputRightElement>
							</Tooltip>
						</InputGroup>

						<Text>Email</Text>
						<InputGroup>
							<Input value={user?.email} variant='filled' disabled />
							<Tooltip label={isEmailCopied ? 'copied' : 'copy'} hasArrow>
								<InputRightElement
									onClick={onCopyEmail}
									_hover={{ cursor: 'pointer' }}
								>
									{isEmailCopied ? <CheckIcon /> : <CopyIcon />}
								</InputRightElement>
							</Tooltip>
						</InputGroup>
					</Flex>
				</CardBody>
			</Card>
		</Page>
	);
});
