import mongoose from 'mongoose';
import AnswerModel from './Answer';
import { IQuestion } from './../types/types';

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

QuestionSchema.pre('findOneAndDelete', async function(next) {
	const question = this;
	const answersToDelete = await AnswerModel.find({ questionId: question.getQuery()['_id'] });

	if (answersToDelete.length) {
		await AnswerModel.deleteMany({
			questionId: { $in: answersToDelete.map((answer) => answer.questionId)}
		});
	}
	next();
})

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;