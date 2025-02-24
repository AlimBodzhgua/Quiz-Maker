export const extractTokenFromLink = (link: string) => {
	return link.split('?token=')[1];
}
