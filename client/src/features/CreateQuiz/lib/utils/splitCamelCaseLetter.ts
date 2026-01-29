export const splitCamelCaseLetter = (word: string): string => {
	return word.replace(/([a-z])([A-Z])/g, '$1 $2');
};
