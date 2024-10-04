import { FC, useState, memo } from 'react';
import { Box, Input, Heading, Button } from '@chakra-ui/react';
import { useUserStore } from 'store/user';


export const RegisterForm: FC = memo(() => {
	const onRegister = useUserStore((state) => state.register);
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
				size='2xl'
				color='gray.50'
				mb='12px'
			>Register</Heading>
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
			<Button onClick={onRegister}>Register</Button>
		</Box>	
	)
});