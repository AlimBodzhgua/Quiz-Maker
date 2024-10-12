import { FC, memo, useState } from 'react';
import { Box, Heading, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useUserStore } from 'src/store/user';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const LoginForm: FC = memo(() => {
	const onLogin = useUserStore((state) => state.login);
	const isLoading = useUserStore((state) => state.isLoading);
	const error = useUserStore((state) => state.error);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onToggleShowPassword = () => setShowPassword((prev) => !prev);

	const handleLogin = () => {
		onLogin(email, password);
	};

	return (
		<Box
			display='flex'
			alignItems='center'
			flexDirection='column'
			bg='gray.800'
			minW='575px'
			gap='10px'
			p='14px 18px'
			borderRadius='base'
		>
			<Heading size='xl' color='gray.50' mb='12px'>
				Login
			</Heading>
			<Input
				placeholder='Login'
				value={email}
				onChange={onEmailChange}
				size='lg'
				color='gray.50'
				isInvalid={error ? true : false}
			/>
			<InputGroup>
				<Input
					placeholder='Password'
					color='gray.50'
					size='lg'
					type={showPassword ? 'text' : 'password'}
					value={password}
					onChange={onPasswordChange}
					isInvalid={error ? true : false}
				/>
				<InputRightElement width='4.5rem'>
					<Button variant='unstyled' onClick={onToggleShowPassword}>
						{showPassword ? (
							<ViewOffIcon color='#ffff' />
						) : (
							<ViewIcon color='#ffff' />
						)}
					</Button>
				</InputRightElement>
			</InputGroup>
			<Button onClick={handleLogin} disabled={isLoading}>
				Login
			</Button>
		</Box>
	);
});
