import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import {
	Button,
	Collapse,
	Flex,
	Heading,
	Input,
	RadioGroup,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { PrivacyValues } from 'shared/constants';
import { getQueryParam } from 'shared/utils';
import type { Quiz, PrivacyTypeValue } from 'entities/Quiz';
import { RestrictedUsersPrivacy } from './RestrictedUsersPrivacy';
import { LinkPrivacy } from './LinkPrivacy';
import { PrivacyItem } from './PrivacyItem';
import { getMatchedPrivacyData } from '../../lib/utils/getMatchedPrivacyData';
import { QuizService } from '../../api/QuizService';

interface PrivacySettingProps {
	onUpdate: (quiz: Partial<Quiz>) => Promise<Quiz>;
}

export const PrivacySettings: FC<PrivacySettingProps> = memo(({ onUpdate }) => {
	const toast = useToast();
	const [privacy, setPrivacy] = useState<PrivacyTypeValue>(PrivacyValues.restrictedUsers);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [userIds, setUserIds] = useState<string[]>([]);
	const [link, setLink] = useState<string>('');

	const initQuizPrivacy = async (id: string) => {
		const quiz = await QuizService.getQuiz(id);
		setPrivacy(quiz.privacy.type);
	};

	useEffect(() => {
		const quizId = getQueryParam('id');
		initQuizPrivacy(quizId);
	}, []);

	const onChangePrivacy = async (value: PrivacyTypeValue) => {
		setPrivacy(value);
	};

	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onAddUserId = useCallback((id: string) => {
		const updatedIds = [...userIds, id]
		setUserIds(updatedIds);
	}, [userIds]);

	const onRemoveUserId = useCallback((id: string) => {
		const updatedIds = userIds.filter((user) => user !== id);
		setUserIds(updatedIds);
	}, [userIds]);

	const onSave = async () => {
		setIsLoading(true);
		const privacyData = getMatchedPrivacyData(privacy, password, link, userIds);
		await onUpdate({ privacy: privacyData })

		toast({
			title: 'Privacy Saved',
			status: 'success',
			position: 'top',
			isClosable: true,
			duration: 2000,
		});
		setIsLoading(false);
	};

	return (
		<Flex direction='column'>
			<Flex justifyContent='space-between' mb='8px'>
				<Heading size='sm' fontWeight='medium' mr='15px' minW='90px'>
					Quiz Privacy
				</Heading>
				<Button
					size='xs'
					variant='outline'
					borderRadius='initial'
					onClick={onSave}
					isLoading={isLoading}
				><CheckIcon /></Button>
			</Flex>
			<RadioGroup colorScheme='blue' onChange={onChangePrivacy} value={privacy}>
				<Stack direction='column'>
					{Object.values(PrivacyValues).map((privacy) => (
						<PrivacyItem key={privacy} privacy={privacy} />
					))}

					<Collapse
						in={privacy === 'publicProtected' || privacy === 'linkProtected'}
						animateOpacity
					>
						<Input
							size='sm'
							placeholder='Password'
							value={password}
							type='password'
							onChange={onPasswordChange}
						/>
					</Collapse>

					<Collapse in={privacy === 'privateLink' || privacy === 'linkProtected'}>
						<LinkPrivacy link={link} setLink={setLink}/>
					</Collapse>

					<Collapse in={privacy === 'restrictedUsers'}>
						<RestrictedUsersPrivacy
							users={userIds}
							onAddUserId={onAddUserId}
							onRemoveUserId={onRemoveUserId}
						/>
					</Collapse>
				</Stack>
			</RadioGroup>
		</Flex>
	);
});