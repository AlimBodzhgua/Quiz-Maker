import type { ChangeEvent, FC } from 'react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
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
		<InputGroup size='sm'>
			<Input
				placeholder='Password'
				value={password}
				type={showPassword ? 'text' : 'password'}
				onChange={onPasswordChange}
			/>
			<InputRightAddon
				as='button'
				onClick={onToggleShowPassword}
				_hover={{ cursor: 'pointer' }}
			>
				{showPassword ? <ViewOffIcon /> : <ViewIcon  />}
			</InputRightAddon>
		</InputGroup>
	);
});
