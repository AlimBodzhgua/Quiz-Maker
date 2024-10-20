import { FC, memo, useState } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { useTestsStore } from 'store/tests';
import { CheckIcon } from '@chakra-ui/icons';

export const CreateTestForm: FC = memo(() => {
	const [title, setTitle] = useState<string>('');
	const [isCreated, setIsCreated] = useState<boolean>(false);
	const createTest = useTestsStore((state) => state.createTest);

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const onAddTest = async () => {
		createTest(title).then(() => setIsCreated(true));
	};

	return (
		<Flex gap='10px'>
			<Input
				placeholder='Test title...'
				value={title}
				onChange={onTitleChange}
				disabled={isCreated}
			/>
			<Button onClick={onAddTest} disabled={isCreated}>
				{isCreated ? <CheckIcon /> : <>Add</>}
			</Button>
		</Flex>
	);
});
