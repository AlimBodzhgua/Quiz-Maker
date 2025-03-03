import { FC, memo } from 'react';
import {
	Box,
	Wrap,
	WrapItem,
	Avatar,
	Button,
	Heading,
	Link,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'shared/constants';
import { useSignOutUser } from 'entities/User';
import { CheckIcon } from '@chakra-ui/icons';
import ProfileIcon from '../assets/profile.svg';
import ListIcon from '../assets/list.svg';
import SignOutIcon from '../assets/signOut.svg';
import AvatarIcon from '../assets/avatar.svg'
import ListBulletsIcon from '../assets/unorderedList.svg';


export const Header: FC = memo(() => {
	const { signOut, isAuthorized } = useSignOutUser();
	const navigate = useNavigate();

	const handleLogout = () => {
		signOut();
		navigate('/login');
	};

	return (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='space-between'
			bg='blue.500'
			w='100%'
			minH='65px'
			p='0 64px'
			as='header'
			zIndex='101'
		>
			<Heading size='md' color='gray.50' display='flex'>
				<Box fontWeight='medium'>Quiz</Box>Maker
			</Heading>
			{isAuthorized ? (
				<Box display='flex'>
					<Link
						as={RouterLink}
						to={AppRoutes.PUBLIC_QUIZZES}
						color='white'
						mr='24px'
						display='flex'
						alignItems='center'
						justifyContent='center'
						gap='4px'
					>
						<ListIcon />
						<Text fontSize='15px'>Public quizzes</Text>
					</Link>
					<Menu placement='bottom' >
						<MenuButton>
							<Avatar icon={<ProfileIcon />} size='sm' bg='gray.50' />
						</MenuButton>
						<MenuList
							display='flex'
							flexDirection='column'
							justifyContent='center'
							minW='0'
							w='145px'
						>
							<MenuItem
								as={RouterLink}
								to={AppRoutes.USER_QUIZZES}
								icon={<ListBulletsIcon />}
							>
								My Quizzes
							</MenuItem>
							<MenuItem
								as={RouterLink}
								to={AppRoutes.COMPLETED_QUIZZES}
								icon={<CheckIcon />}
							>
								Completed
							</MenuItem>
							<MenuItem
								as={RouterLink}
								to={AppRoutes.PROFILE}
								icon={<AvatarIcon />}
							>
								Profile
							</MenuItem>
							<MenuItem
								onClick={handleLogout}
								icon={<SignOutIcon />}
							>
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				</Box>
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
