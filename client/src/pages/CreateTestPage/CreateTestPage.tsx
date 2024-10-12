import { FC, useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { CreateTestForm } from 'components/CreateTestForm/CreateTestForm';
import { AddIcon } from '@chakra-ui/icons';
import { Page } from 'components/UI/Page/Page';

const CreateTestPage: FC = () => {
	const [showForm, setShowForm] = useState<boolean>(false);

	const toggleShowForm = () => setShowForm((prev) => !prev);

	return (
		<Page>
			<Heading m='12px 0'>Сreating a new test</Heading>
			<Box>
				{showForm && <CreateTestForm />}
				<Button onClick={toggleShowForm}>
					<AddIcon />
				</Button>
			</Box>
		</Page>
	);
};

export default CreateTestPage;
