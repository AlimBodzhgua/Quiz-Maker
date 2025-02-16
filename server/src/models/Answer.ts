import mongoose from 'mongoose';
import { Answer } from '../types/types';

export const AnswerSchema = new mongoose.Schema<Answer>({
	// _id;
	value: {
		type: String,
		required: true,
	},
	isCorrect: {
		type: Boolean,
		required: true,
	},
	order: {
		type: Number,
		required: true,
	},
	questionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question',
		required: true,
	}
});

const AnswerModel = mongoose.model<Answer>('Answer', AnswerSchema);

export default AnswerModel;