import mongoose from 'mongoose';
import { CompletedQuiz } from '../types/types';

const CompletedQuizSchema = new mongoose.Schema<CompletedQuiz>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	quizId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz',
		required: true,
	},
	quizTitle: {
		type: String,
		required: true,
	},
	correct: {
		type: Number,
		required: true,
	},
	incorrect: {
		type: Number,
		required: true,
	},
	timeResult: {
		type: Object,
		required: false,
	},
	date: {
		type: String,
		required: true,
	},
})

const CompletedQuizModel = mongoose.model<CompletedQuiz>('CompletedQuiz', CompletedQuizSchema);

export default CompletedQuizModel;