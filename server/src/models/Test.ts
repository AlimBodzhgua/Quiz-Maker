import mongoose from 'mongoose';
import QuestionModel from './Question';
import AnswerModel from './Answer';
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


TestSchema.pre('findOneAndDelete', async function(next) {
	const test = this;
	const questionsToDelete = await QuestionModel.find({ testId: test.getQuery()['_id'] });

	if (questionsToDelete.length) {
		await QuestionModel.deleteMany({ testId: { $in: questionsToDelete.map((question) => question.testId) }});
		await AnswerModel.deleteMany({ questionId: { $in: questionsToDelete.map((question) => question._id) }});
	}
	next();
})

const TestModel = mongoose.model<ITest>('Test', TestSchema);

export default TestModel;