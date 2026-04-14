import type { FC } from 'react';

import { CloseIcon } from '@chakra-ui/icons';
import { Button, ListItem, Text } from '@chakra-ui/react';
import { memo } from 'react';

interface RestrictedUserItemProps {
	user: string;
	onRemove: (id: string) => void;
}

export const RestrictedUserItem: FC<RestrictedUserItemProps> = memo((props) => {
	const { user, onRemove } = props;

	const handleRemove = () => onRemove(user);

	return (
		<ListItem
			display='flex'
			alignItems='center'
			justifyContent='center'
			backgroundColor='blackAlpha.200'
			shadow='md'
			pl='5px'
			pt='2px'
			borderRadius='base'
		>
			<Text>{user}</Text>
			<Button
				size='xs'
				variant='unstyled'
				p='0'
				display='flex'
				justifyContent='center'
				alignItems='center'
				onClick={handleRemove}
			>
				<CloseIcon fontSize='smaller' />
			</Button>
		</ListItem>
	);
});
