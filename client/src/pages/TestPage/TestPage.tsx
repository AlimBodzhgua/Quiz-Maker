import { FC, useEffect } from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Page } from 'components/UI/Page/Page';
import { useCurrentTest } from 'store/currentTest';
import { QuestionsList } from 'components/QuestionsList/QuestionsList';
import { useShallow } from 'zustand/shallow';

const TestPage: FC = () => {
	const { id } = useParams<{ id?: string }>();
	const getCurrentTest = useCurrentTest(useShallow((state) => state.getCurrentTest));
	const test = useCurrentTest((state) => state.test);
	const questions = useCurrentTest((state) => state.questions);

	useEffect(() => {
		if (id) {
			getCurrentTest(id);
		}
	}, [id]);

	return (
		<Page>
			<Heading size='lg'>{test?.title}</Heading>
			<Text>Total quesetions: {questions?.length}</Text>
			<QuestionsList />
		</Page>
	);
};

export default TestPage;
