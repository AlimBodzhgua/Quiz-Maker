import { PrivacyType, PrivacyTypeValue } from 'entities/Quiz';

export const getMatchedPrivacyData = (
	privacy: PrivacyTypeValue,
	password: string,
	link: string,
	userIds: string[],
) => {
	let privacyData: PrivacyType;

	switch (privacy) {
		case 'public':
			privacyData = { type: 'public' };
			break;
		case 'private':
			privacyData = { type: 'private' };
			break;
		case 'publicProtected':
			privacyData = { type: 'publicProtected', password: password };
			break;
		case 'privateLink':
			privacyData = { type: 'privateLink', link: link };
			break;
		case 'linkProtected':
			privacyData = { type: 'linkProtected', password: password, link: link };
			break;
		case 'restrictedUsers':
			privacyData = { type: 'restrictedUsers', userIds: userIds };
			break;
	}
	
	return privacyData;
};