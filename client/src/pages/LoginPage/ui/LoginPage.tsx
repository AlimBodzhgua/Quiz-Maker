import { FC } from 'react';
import { LoginForm } from 'features/Auth';
import { Page } from 'widgets/Page';

const LoginPage: FC = () => {
	return (
		<Page centered>
			<LoginForm />
		</Page>
	);
};

export default LoginPage;
