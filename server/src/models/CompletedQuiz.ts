import mongoose from 'mongoose';
import { ICompletedQuiz } from '../types/types';

const CompletedQuizSchema = new mongoose.Schema<ICompletedQuiz>({
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
	}
})

const CompletedQuizModel = mongoose.model<ICompletedQuiz>('CompletedQuiz', CompletedQuizSchema);

export default CompletedQuizModel;