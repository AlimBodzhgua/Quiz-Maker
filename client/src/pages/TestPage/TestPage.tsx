import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from 'components/UI/Page/Page';

const TestPage: FC = () => {
	const { id } = useParams<{ id?: string }>();

	return <Page>Test page {id}</Page>;
};

export default TestPage;
