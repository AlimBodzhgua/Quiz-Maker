import { FC, memo, useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useTestsStore } from 'store/tests';

export const CreateTestForm: FC = memo(() => {
	const [title, setTitle] = useState<string>('');
	const createTest = useTestsStore((state) => state.createTest);

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const onAddTest = async () => {
		createTest(title);
	};

	return (
		<>
			<Input placeholder='Test title' value={title} onChange={onTitleChange} />
			<Button onClick={onAddTest}>Add</Button>
		</>
	);
});
