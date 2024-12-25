import { QuizPrivacy } from 'types/types';

export const privacyValues = {
	public: 'public',
	private: 'private',
	privateLink: 'privateLink',
	privateLinkPassword: 'privateLinkPassword',
	privateUsers: 'privateUsers',
} as const;

export const mapToPrivacyText: Record<QuizPrivacy, string> = {
	private: 'Private',
	public: 'Public',
	privateLink: 'Private Access with a link',
	privateLinkPassword: 'Private access with a link & password',
	privateUsers: 'Private access for selected users',
};

export const mapToPrivacyLabelText: Record<QuizPrivacy, string> = {
	private: 'Enable quiz access only for you',
	public: 'Enable quiz access for all users and displays in public quizzes table',
	privateLink: 'Enable access with a link so only those who have the link can access the quiz',
	privateLinkPassword: 'Enable private access with a link and password so users without password cannot access the quiz.',
	privateUsers: 'Enable private access with user id (you can set the list of user ids)',
};
