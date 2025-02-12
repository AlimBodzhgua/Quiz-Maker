export const create24CharId = () => {
	return crypto.randomUUID().split('-').join('').substring(0, 24);
}