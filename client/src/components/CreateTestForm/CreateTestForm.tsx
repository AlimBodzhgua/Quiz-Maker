import { FC, memo, useState } from 'react';
import { Button, Flex, Input, Tooltip } from '@chakra-ui/react';
import { useTestsStore } from 'store/tests';
import { CheckIcon } from '@chakra-ui/icons';

export const CreateTestForm: FC = memo(() => {
	const [title, setTitle] = useState<string>('');
	const [isCreated, setIsCreated] = useState<boolean>(false);
	const createTest = useTestsStore((state) => state.createTest);
	const isSmallLength = title.length <= 3;

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const onAddTest = () => {
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
			<Tooltip label={isSmallLength && 'Title must be at least 4 characters long'}>
				<Button onClick={onAddTest} disabled={isCreated || isSmallLength}>
					{isCreated ? <CheckIcon /> : <>Add</>}
				</Button>
			</Tooltip>
		</Flex>
	);
});
