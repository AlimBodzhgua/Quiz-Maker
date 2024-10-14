import { IQuestion } from './../types/types';
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema<IQuestion>({
	// _id;
	description: {
		type: String,
		require: true,
	},
	testId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Test',
		require: true,
	},
	type: {
		type: String,
		require: true,
	},
	order: {
		type: Number,
		require: true,
	},
})

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;