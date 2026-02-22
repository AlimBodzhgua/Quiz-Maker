import type { FC } from 'react';

import { CheckIcon } from '@chakra-ui/icons';
import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	WrapItem,
} from '@chakra-ui/react';
import { useSignOutUser } from 'entities/User';
import { LangSwitcher } from 'features/LangSwitcher';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'shared/constants';

import AvatarIcon from '../assets/avatar.svg';
import ListIcon from '../assets/list.svg';
import ProfileIcon from '../assets/profile.svg';
import SignOutIcon from '../assets/signOut.svg';
import ListBulletsIcon from '../assets/unorderedList.svg';

export const Header: FC = memo(() => {
	const { t } = useTranslation();
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
				<Box fontWeight='medium'>Quiz</Box>
				Maker
			</Heading>
			<Flex gap='14px'>
				{isAuthorized
					? (
						<Flex>
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
								<Text fontSize='15px'>{t('Public quizzes')}</Text>
							</Link>

							<Menu placement='bottom'>
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
										{t('My Quizzes')}
									</MenuItem>
									<MenuItem
										as={RouterLink}
										to={AppRoutes.COMPLETED_QUIZZES}
										icon={<CheckIcon />}
									>
										{t('Completed')}
									</MenuItem>
									<MenuItem
										as={RouterLink}
										to={AppRoutes.PROFILE}
										icon={<AvatarIcon />}
									>
										{t('Profile')}
									</MenuItem>
									<MenuItem onClick={handleLogout} icon={<SignOutIcon />}>
										{t('Logout')}
									</MenuItem>
								</MenuList>
							</Menu>

						</Flex>
					)
					:
					(
						<Flex gap='10px'>
							<WrapItem>
								<Button
									to={AppRoutes.REGISTER}
									as={RouterLink}
									variant='outline'
									color='gray.50'
									size='sm'
									_hover={{ bg: 'gray.700' }}
								>
									{t('Register')}
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
									{t('Login')}
								</Button>
							</WrapItem>
						</Flex>
					)
				}
				<LangSwitcher />
			</Flex>
		</Box>
	);
});
