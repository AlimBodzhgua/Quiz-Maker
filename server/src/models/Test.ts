import mongoose from 'mongoose';
import type { ITest } from '../types/types';

const TestSchema = new mongoose.Schema<ITest>({
	// _id;
	title: {
		type: String,
		require: true,
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	}
}, { timestamps: true })

const TestModel = mongoose.model<ITest>('Test', TestSchema);

export default TestModel;