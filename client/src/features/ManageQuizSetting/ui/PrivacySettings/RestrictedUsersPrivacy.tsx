import { ChangeEvent, FC, memo, useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import {
	Flex,
	Input,
	InputGroup,
	InputRightAddon,
	List,
} from '@chakra-ui/react';
import { RestrictedUserItem } from './RestrictedUserItem';

interface RestrictedUsersPrivacyProps {
	users: string[];
	onAddUserId: (id: string) => void;
	onRemoveUserId: (id: string) => void;
}

export const RestrictedUsersPrivacy: FC<RestrictedUsersPrivacyProps> = memo((props) => {
	const {
		users,
		onAddUserId,
		onRemoveUserId,
	} = props;
	const [userId, setUserId] = useState<string>('');

	const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
		setUserId(e.target.value);
	}

	const handleAddUserId = () => {
		onAddUserId(userId);
		setUserId('');
	};

	return (
		<Flex direction='column'>
			<InputGroup size='sm'>
				<Input
					placeholder='Enter user id'
					value={userId}
					onChange={onChangeUserId}
				/>
				<InputRightAddon onClick={handleAddUserId}>
					<AddIcon />
				</InputRightAddon>
			</InputGroup>
			<List display='flex' flexWrap='wrap' gap='5px' mt='8px'>
				{users.map((user) => (
					<RestrictedUserItem key={user} user={user} onRemove={onRemoveUserId}/> 
				))}
			</List>
		</Flex>
	);
});