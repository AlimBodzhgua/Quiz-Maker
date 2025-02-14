import { FC, memo, useEffect, useState } from 'react';
import { Heading, Input, Button, InputGroup, InputRightElement, Card, InputLeftElement } from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useSignInUser } from 'entities/User';

export const LoginForm: FC = memo(() => {
	const { signInUser, isLoading, error } = useSignInUser();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onPressEnter = (e: KeyboardEvent) => {
		e.preventDefault();
		if (e.key === 'Enter') {
			signInUser(email, password);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onPressEnter);

		return () => window.removeEventListener('keydown', onPressEnter);
	}, []);

	const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onToggleShowPassword = () => setShowPassword((prev) => !prev);

	const handleLogin = () => {
		signInUser(email, password);
	};

	return (
		<Card
			display='flex'
			alignItems='center'
			flexDirection='column'
			maxW='435px'
			w='100%'
			gap='10px'
			p='14px 18px'
			as='form'
		>
			<Heading size='xl' mb='12px' color='gray.600'>
				Login
			</Heading>
			<InputGroup>
				<InputLeftElement>
					<EmailIcon />
				</InputLeftElement>
				<Input
					placeholder='Login'
					value={email}
					onChange={onEmailChange}
					variant='filled'
					size='md'
					isInvalid={error ? true : false}
				/>
			</InputGroup>
			<InputGroup>
				<InputLeftElement>
					<LockIcon/>
				</InputLeftElement>
				<Input
					value={password}
					onChange={onPasswordChange}
					type={showPassword ? 'text' : 'password'}
					isInvalid={error ? true : false}
					placeholder='Password'
					variant='filled'
					size='md'
				/>
				<InputRightElement width='4.5rem'>
					<Button variant='unstyled' onClick={onToggleShowPassword}>
						{showPassword ? (
							<ViewOffIcon color='#000' />
						) : (
							<ViewIcon color='#000' />
						)}
					</Button>
				</InputRightElement>
			</InputGroup>
			<Button
				onClick={handleLogin}
				disabled={isLoading}
				colorScheme='cyan'
				color='white'
				w='100%'
				mt='20px'
			>
				Login
			</Button>
		</Card>
	);
});
