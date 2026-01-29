import type { ChangeEvent, FC } from 'react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { memo, useState } from 'react';

interface PasswordPrivacyProps {
	password: string;
	onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordPrivacy: FC<PasswordPrivacyProps> = memo((props) => {
	const { password, onPasswordChange } = props;
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onToggleShowPassword = () => setShowPassword((prev) => !prev);

	return (
		<InputGroup>
			<Input
				size='sm'
				placeholder='Password'
				value={password}
				type={showPassword ? 'text' : 'password'}
				onChange={onPasswordChange}
			/>
			<InputRightElement height='100%'>
				<Button size='xs' variant='unstyled' onClick={onToggleShowPassword}>
					{showPassword ? <ViewOffIcon color='#000' /> : <ViewIcon color='#000' />}
				</Button>
			</InputRightElement>
		</InputGroup>
	);
});
