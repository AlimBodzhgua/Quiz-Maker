import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import {
	Button,
	Collapse,
	Flex,
	Heading,
	Input,
	RadioGroup,
	Stack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { PrivacyValues } from 'shared/constants';
import { getQueryParam } from 'shared/utils';
import type { Quiz, QuizPrivacy } from 'entities/Quiz';
import { QuizService } from '../../api/QuizService';
import { LinkPrivacy } from './LinkPrivacy';
import { RestrictedUsersPrivacy } from './RestrictedUsersPrivacy';
import { PrivacyItem } from './PrivacyItem';

interface PrivacySettingProps {
	onUpdate: (quiz: Partial<Quiz>) => Promise<Quiz>;
}

const LINK = 'http://localhost:3000/create-quiz';

export const PrivacySettings: FC<PrivacySettingProps> = memo(({ onUpdate }) => {
	const [privacy, setPrivacy] = useState<QuizPrivacy>(PrivacyValues.restrictedUsers);

	const [password, setPassword] = useState<string>('');
	const [userIds, setUserIds] = useState<string[]>([]);

	const initQuizPrivacy = async (id: string) => {
		const quiz = await QuizService.getQuiz(id);
		setPrivacy(quiz.privacy.type);
	};

	useEffect(() => {
		const quizId = getQueryParam('id');
		initQuizPrivacy(quizId);
	}, []);

	const onChangePrivacy = async (value: QuizPrivacy) => {
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

	const onSave = () => {
		if (privacy === 'public') {
			onUpdate({ privacy: { type: 'public' }});
		} else if (privacy === 'private') {
			onUpdate({ privacy: { type: 'private' }});
		} else if (privacy === 'publicProtected') {
			onUpdate({ privacy: { type: 'publicProtected', password: password }});
		} else if (privacy === 'privateLink') {
			onUpdate({ privacy: { type: 'privateLink', link: LINK} });
		} else if (privacy === 'linkProtected') {
			onUpdate({ privacy: { type: 'linkProtected', password: password, link: LINK }});
		} else if (privacy === 'restrictedUsers') {
			onUpdate({ privacy: { type: 'restrictedUsers', userIds: userIds }});
		}
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
						<LinkPrivacy link={LINK}/>
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