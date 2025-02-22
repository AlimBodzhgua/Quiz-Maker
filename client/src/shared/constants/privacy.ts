export const PrivacyValues = {
	public: 'public',
	private: 'private',
	publicProtected: 'publicProtected',
	privateLink: 'privateLink',
	linkProtected: 'linkProtected',
	restrictedUsers: 'restrictedUsers',
} as const;

type QuizPrivacy = keyof typeof PrivacyValues;

export const mapToPrivacyText: Record<QuizPrivacy, string> = {
	private: 'Private',
	publicProtected: 'Public Protected with password',
	public: 'Public',
	privateLink: 'Private Access with a link',
	linkProtected: 'Private access with a link & password',
	restrictedUsers: 'Private access for selected users',
};

export const mapToPrivacyLabelText: Record<QuizPrivacy, string> = {
	private: 'Enable quiz access only for you',
	publicProtected: 'Available in public quizzes table, but only accessible with a password',
	public: 'Enable quiz access for all users and displays in public quizzes table',
	privateLink: 'Enable access with a link so only those who have the link can access the quiz',
	linkProtected: 'Enable private access with a link and password so users without password cannot access the quiz.',
	restrictedUsers: 'Enable private access with user id (you can set the list of user ids)',
};