import { FC, memo } from 'react';
import {
	Box, 
	Wrap,
	WrapItem,
	Avatar,
	PopoverTrigger,
	Button,
	Popover,
	PopoverContent,
	PopoverBody,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { AppRoutes } from 'src/router/router';
import { useUserStore } from 'src/store/user';
import ProfileIcon from 'src/assets/profile.svg';

export const Header: FC = memo(() => {
	const user = useUserStore((state) => state.user);
	const logout = useUserStore((state) => state.logout);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	}

	return (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='flex-end'
			bg='gray.800'
			w='100%'
			h='65px'
			p='0 64px'
			as='header'
		>
			{user ? (
				<Popover>
					<PopoverTrigger>
						<Avatar icon={<ProfileIcon />} size='sm' bg='gray.50' />
					</PopoverTrigger>
					<PopoverContent w='175px' mt='5px'>
						<PopoverBody display='flex' flexDirection='column' gap='4px'>
							<Button size='sm'>My tests</Button>
							<Button size='sm'>Completed</Button>
							<Button size='sm'>Profile</Button>
							<Button size='sm' onClick={handleLogout}>
								Logout
							</Button>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			) : (
				<Wrap spacing='20px'>
					<WrapItem>
						<Button
							to={AppRoutes.REGISTER}
							as={RouterLink}
							variant='outline'
							color='gray.50'
							size='sm'
							_hover={{ bg: 'gray.700' }}
						>
							Register
						</Button>
					</WrapItem>
					<WrapItem>
						<Button
							to={AppRoutes.LOGIN}
							as={RouterLink}
							variant='outline'
							color='gray.50'
							size='sm'
							_hover={{ bg: 'gray.700' }}
						>
							Login
						</Button>
					</WrapItem>
				</Wrap>
			)}
		</Box>
	);
});