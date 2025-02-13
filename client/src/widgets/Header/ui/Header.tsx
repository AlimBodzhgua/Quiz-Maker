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
	Heading,
	Link,
	Text,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'shared/constants';
import { useSignOutUser } from 'entities/User';
import ProfileIcon from '../assets/profile.svg';
import ListIcon from '../assets/list.svg';

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
			bg='gray.800'
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
					<Popover closeDelay={15}>
						<PopoverTrigger>
							<Button variant='unstyled'>
								<Avatar icon={<ProfileIcon />} size='sm' bg='gray.50' />
							</Button>
						</PopoverTrigger>
						<PopoverContent w='175px' mt='5px'>
							<PopoverBody display='flex' flexDirection='column' gap='4px'>
								<Button
									as={RouterLink}
									to={AppRoutes.MAIN}
									size='sm'
								>
									My Quizzes
								</Button>
								<Button
									as={RouterLink}
									to={AppRoutes.COMPLETED_QUIZZES}
									size='sm'
								>
									Completed
								</Button>
								<Button
									as={RouterLink}
									to={AppRoutes.PROFILE}
									size='sm'
								>
									Profile
								</Button>
								<Button size='sm' onClick={handleLogout}>
									Logout
								</Button>
							</PopoverBody>
						</PopoverContent>
					</Popover>
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
