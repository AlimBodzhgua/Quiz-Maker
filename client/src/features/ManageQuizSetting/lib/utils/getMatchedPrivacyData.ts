import { PrivacyType, PrivacyTypeValue } from 'entities/Quiz';
import { extractTokenFromLink } from './extractTokenFromLink';


export const getMatchedPrivacyData = (
	privacy: PrivacyTypeValue,
	password: string,
	link: string,
	userIds: string[],
) => {
	let privacyData: PrivacyType;
	let token: string;

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
			token = extractTokenFromLink(link);
			privacyData = { type: 'privateLink', token: token };
			break;
		case 'linkProtected':
			token = extractTokenFromLink(link);
			privacyData = { type: 'linkProtected', password: password, token: token };
			break;
		case 'restrictedUsers':
			privacyData = { type: 'restrictedUsers', userIds: userIds };
			break;
	}
	
	return privacyData;
};