import mongoose from 'mongoose';
import { ICompletedTest } from '../types/types';

const CompletedTestSchema = new mongoose.Schema<ICompletedTest>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	testId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Test',
		require: true,
	},
	correct: {
		type: Number,
		required: true,
	},
	incorrect: {
		type: Number,
		required: true,
	},
})

const CompletedTestModel = mongoose.model<ICompletedTest>('User', CompletedTestSchema);

export default CompletedTestModel;