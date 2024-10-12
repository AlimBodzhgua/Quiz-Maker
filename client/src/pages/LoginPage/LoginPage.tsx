import { FC } from 'react';
import { LoginForm } from 'components/Auth/LoginForm';
import { Page } from 'src/components/UI/Page/Page';

const LoginPage: FC = () => {
	return (
		<Page>
			<LoginForm />
		</Page>
	);
};

export default LoginPage;
