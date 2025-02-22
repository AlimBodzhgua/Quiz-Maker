import { FC, memo } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { Button, ListItem, Text } from '@chakra-ui/react';

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
			backgroundColor='blackAlpha.100'
			pl='5px'
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
				<CloseIcon fontSize='smaller' color='blackAlpha.500' />
			</Button>
		</ListItem>
	);
});