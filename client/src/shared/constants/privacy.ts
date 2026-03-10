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
	public: 'quiz_privacy.types.public',
	private: 'quiz_privacy.types.private',
	publicProtected: 'quiz_privacy.types.public_password',
	privateLink: 'quiz_privacy.types.private_link',
	linkProtected: 'quiz_privacy.types.private_link_password',
	restrictedUsers: 'quiz_privacy.types.private_users',
};

export const mapToPrivacyLabelText: Record<QuizPrivacy, string> = {
	public: 'quiz_privacy.descriptions.public',
	private: 'quiz_privacy.descriptions.private',
	publicProtected: 'quiz_privacy.descriptions.public_password',
	privateLink: 'quiz_privacy.descriptions.private_link',
	linkProtected: 'quiz_privacy.descriptions.private_link_password',
	restrictedUsers: 'quiz_privacy.descriptions.private_users',
};
