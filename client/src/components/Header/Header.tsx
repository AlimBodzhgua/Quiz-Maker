import { FC, memo, useState } from 'react';
import {
	Link,
	Box, 
	Flex,
	Wrap,
	WrapItem,
	Avatar,
	PopoverTrigger,
	Button,
	Popover,
	PopoverContent,
	PopoverBody,
} from '@chakra-ui/react';
import { Link as RouterLink} from 'react-router-dom';
import { AppRoutes } from 'src/router/router';
import { HamburgerIcon } from '@chakra-ui/icons'


export const Header: FC = memo(() => {
	const [isAuth, setIsAuth] = useState<boolean>(false);

	return (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='flex-end'
			bg='gray.800'
			w='100%'
			h='65px'
			p='0 50px'
			as='header'
		>
			{isAuth ? (
				//<Avatar icon={<HamburgerIcon />}/>
				<Popover>
				<PopoverTrigger>
					<Button><Avatar icon={<HamburgerIcon />}/></Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverBody display='flex' flexDirection='column'>
						<Button>My tests</Button>
						<Button>Completed</Button>
						<Button>Profile</Button>
						<Button>Logout</Button>
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
							_hover={{bg: 'gray.700'}}
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
							_hover={{bg: 'gray.700'}}
						>
							Login
						</Button>
					</WrapItem>
				</Wrap>
			)}
		</Box>
	);
});