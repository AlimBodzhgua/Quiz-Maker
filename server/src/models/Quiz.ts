import mongoose from 'mongoose';
import QuestionModel from './Question';
import AnswerModel from './Answer';
import type { IQuiz } from '../types/types';

const QuizSchema = new mongoose.Schema<IQuiz>({
	// _id;
	title: {
		type: String,
		required: true,
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	withTimer: {
		type: Boolean,
		required: false,
	},
	timerLimit: {
		type: Object,
		required: false,
	}
}, { timestamps: true })


QuizSchema.pre('findOneAndDelete', async function(next) {
	const quiz = this;
	const questionsToDelete = await QuestionModel.find({ quizId: quiz.getQuery()['_id'] });

	if (questionsToDelete.length) {
		await QuestionModel.deleteMany({ quizId: { $in: questionsToDelete.map((question) => question.quizId) }});
		await AnswerModel.deleteMany({ questionId: { $in: questionsToDelete.map((question) => question._id) }});
	}
	next();
})

const QuizModel = mongoose.model<IQuiz>('Quiz', QuizSchema);

export default QuizModel;