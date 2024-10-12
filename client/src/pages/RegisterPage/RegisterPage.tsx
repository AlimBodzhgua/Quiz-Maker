import { FC } from 'react';
import { RegisterForm } from 'components/Auth/RegisterForm';
import { Page } from 'components/UI/Page/Page';

const RegisterPage: FC = () => {
	return (
		<Page centered>
			<RegisterForm />
		</Page>
	);
};

export default RegisterPage;
