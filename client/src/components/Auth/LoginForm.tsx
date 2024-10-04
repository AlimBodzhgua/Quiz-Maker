import { FC, memo, useState } from 'react';
import { Box, Heading, Input, Button } from '@chakra-ui/react';
import { useUserStore } from 'src/store/user';

export const LoginForm: FC = memo(() => {
	const onLogin = useUserStore((state) => state.login);
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value);
	}

	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}

	return (
		<Box
			display='flex'
			alignItems='center'
			flexDirection='column'
			bg='blackAlpha.900'
			minW='575px'
			gap='10px'
			p='14px 18px'
		>
			<Heading
				size='xl'
				color='gray.50'
				mb='12px'
			>Login</Heading>
			<Input
				placeholder='Login'
				value={login}
				onChange={onLoginChange}
				size='lg'
				color='gray.50'
			/>
			<Input
				placeholder='Password'
				value={password}
				onChange={onPasswordChange}
				size='lg'
				color='gray.50'
			/>
			<Button onClick={onLogin}>Login</Button>
		</Box>	
	)
});