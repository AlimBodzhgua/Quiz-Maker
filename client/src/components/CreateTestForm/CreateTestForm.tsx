import { Button, Input } from '@chakra-ui/react';
import { FC, memo } from 'react';

export const CreateTestForm: FC = memo(() => {
	return (
		<>
			<Input placeholder='Test title' />
			<Button>Add</Button>
		</>
	)
});