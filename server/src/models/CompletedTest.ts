import mongoose from 'mongoose';
import { ICompletedTest } from '../types/types';

const CompletedTestSchema = new mongoose.Schema<ICompletedTest>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	testId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Test',
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

const CompletedTestModel = mongoose.model<ICompletedTest>('CompletedTest', CompletedTestSchema);

export default CompletedTestModel;