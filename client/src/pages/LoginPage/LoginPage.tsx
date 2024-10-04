import { FC } from 'react';
import { LoginForm } from 'components/Auth/LoginForm';
import { Page } from 'components/Page/Page';

const LoginPage: FC = () => {

	return (
		<Page>
			<LoginForm />
		</Page>
	)
}

export default LoginPage;