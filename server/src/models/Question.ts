import mongoose from 'mongoose';
import AnswerModel from './Answer';
import { Question } from './../types/types';

const QuestionSchema = new mongoose.Schema<Question>({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
	},
	description: {
		type: String,
		required: true,
	},
	quizId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz',
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	order: {
		type: Number,
		required: true,
	},
}, { _id: false })

QuestionSchema.pre('findOneAndDelete', async function(next) {
	const question = this;
	const answersToDelete = await AnswerModel.find({ questionId: question.getQuery()['_id'] });

	if (answersToDelete.length) {
		await AnswerModel.deleteMany({
			questionId: { $in: answersToDelete.map((answer) => answer.questionId) }
		});
	}
	next();
})

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;