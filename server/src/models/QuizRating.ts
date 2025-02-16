import mongoose from 'mongoose';
import { QuizRating } from '../types/types';

export const QuizRatingSchema = new mongoose.Schema<QuizRating>({
	// _id;
	rate: {
		type: Number,
		required: true,
	},
	quizId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz',
		required: true,
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}
});

const QuizRatingModel = mongoose.model<QuizRating>('QuizRating', QuizRatingSchema);

export default QuizRatingModel;