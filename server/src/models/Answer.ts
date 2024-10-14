import mongoose from 'mongoose';
import { IAnswer } from '../types/types';

export const AnswerSchema = new mongoose.Schema<IAnswer>({
	// _id;
	value: {
		type: String,
		require: true,
	},
	isCorrect: {
		type: Boolean,
		require: true,
	},
	questionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question',
		require: true,
	}
});

const AnswerModel = mongoose.model<IAnswer>('Answer', AnswerSchema);

export default AnswerModel;