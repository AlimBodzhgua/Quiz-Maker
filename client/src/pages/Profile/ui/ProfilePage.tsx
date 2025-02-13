import { FC } from 'react';
import { ProfileCard } from 'entities/User';
import { Page } from 'widgets/Page';


const ProfilePage: FC = () => {
	return (
		<Page>
			<ProfileCard />
		</Page>
	)
}

export default ProfilePage;