import { FC } from 'react';
import { RegisterForm } from 'features/Auth';
import { Page } from 'widgets/Page';

const RegisterPage: FC = () => {
	return (
		<Page centered>
			<RegisterForm />
		</Page>
	);
};

export default RegisterPage;
