import mongoose from 'mongoose';
import { IAnswer } from '../types/types';

export const AnswerSchema = new mongoose.Schema<IAnswer>({
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

const AnswerModel = mongoose.model<IAnswer>('Answer', AnswerSchema);

export default AnswerModel;