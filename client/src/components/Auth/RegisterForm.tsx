import { FC, useState, memo } from 'react';
import { Box, Input, Heading, Button, InputRightElement, InputGroup } from '@chakra-ui/react';
import { useUserStore } from 'store/user';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const RegisterForm: FC = memo(() => {
	const onRegister = useUserStore((state) => state.register);
	const isLoading = useUserStore((state) => state.isLoading);
	const error = useUserStore((state) => state.error);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(true);

	const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onToggleShowPassword = () => setShowPassword((prev) => !prev);

	const handleRegister = () => {
		onRegister(email, password);
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
				Register
			</Heading>
			<Input
				placeholder='Email'
				value={email}
				onChange={onEmailChange}
				size='lg'
				color='gray.50'
				isInvalid={error ? true : false}
			/>
			<InputGroup>
				<Input
					placeholder='Password'
					size='lg'
					color='gray.50'
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
			<Button onClick={handleRegister} disabled={isLoading}>
				Register
			</Button>
		</Box>
	);
});
