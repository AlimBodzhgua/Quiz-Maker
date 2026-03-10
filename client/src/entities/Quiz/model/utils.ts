export const getTokenLink = (quizId: string, token: string) => {
	return `http://localhost:3000/quiz/${quizId}?token=${token}`;
}
