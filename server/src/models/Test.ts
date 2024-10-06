import mongoose from 'mongoose';
import type { ITest } from '../types/types';

const TestSchema = new mongoose.Schema<ITest>({
	title: {
		type: String,
		require: true,
	},
	createAt: {
		type: Date,
	}
})

const TestModel = mongoose.model<ITest>('Test', TestSchema);

export default TestModel;