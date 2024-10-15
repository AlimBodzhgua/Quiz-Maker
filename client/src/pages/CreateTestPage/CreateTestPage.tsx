import { FC, useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { CreateTestForm } from 'components/CreateTestForm/CreateTestForm';
import { AddQuestionForm } from 'components/AddQuestionForm/AddQuestionForm';
import { Page } from 'components/UI/Page/Page';

const CreateTestPage: FC = () => {
	const [showForm, setShowForm] = useState<boolean>(false);
	//const [showAddQuestion, setShowAddQuestion] = useState<boolean>(false);

	const toggleShowForm = () => setShowForm((prev) => !prev);

	return (
		<Page>
			<Heading m='12px 0'>Сreating a new test</Heading>
			<Box
				display='flex'
				flexDirection='column'
				gap='10px'
				border='1px'
				borderColor='blue.200'
				borderRadius='base'
				w='70%'
				p='20px'
			>
				<CreateTestForm />
				{showForm && <AddQuestionForm />}
				<Button onClick={toggleShowForm}>+ New Question</Button>
			</Box>
		</Page>
	);
};

export default CreateTestPage;
