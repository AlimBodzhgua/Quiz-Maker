import type { FC } from 'react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Card, Heading, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { useSignUpUser } from 'entities/User';
import { memo, useEffect, useState } from 'react';

export const RegisterForm: FC = memo(() => {
	const { signUpUser, isLoading, error } = useSignUpUser();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onPressEnter = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			signUpUser(email, password);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onPressEnter);

		return () => window.removeEventListener('keydown', onPressEnter);
	}, [onPressEnter]);

	const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onToggleShowPassword = () => setShowPassword((prev) => !prev);

	const handleRegister = async () => {
		await signUpUser(email, password);
		window.location.replace('/user-quizzes');
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
			<Heading size='xl' color='gray.600' mb='12px'>
				Register
			</Heading>
			<InputGroup>
				<InputLeftElement>
					<EmailIcon />
				</InputLeftElement>
				<Input
					placeholder='Email'
					value={email}
					onChange={onEmailChange}
					variant='filled'
					size='md'
					isInvalid={!!error}
				/>
			</InputGroup>
			<InputGroup>
				<InputLeftElement>
					<LockIcon />
				</InputLeftElement>
				<Input
					value={password}
					onChange={onPasswordChange}
					type={showPassword ? 'text' : 'password'}
					isInvalid={!!error}
					placeholder='Password'
					variant='filled'
					size='md'
				/>
				<InputRightElement width='4.5rem'>
					<Button variant='unstyled' onClick={onToggleShowPassword}>
						{showPassword
							? <ViewOffIcon color='#000' />
							: <ViewIcon color='#000' />
						}
					</Button>
				</InputRightElement>
			</InputGroup>
			<Button
				onClick={handleRegister}
				disabled={isLoading}
				colorScheme='cyan'
				color='white'
				w='100%'
				mt='20px'
			>
				Register
			</Button>
		</Card>
	);
});
