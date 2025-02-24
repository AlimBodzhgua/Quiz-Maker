import mongoose from 'mongoose';
import QuestionModel from './Question';
import AnswerModel from './Answer';
import type { Quiz } from '../types/types';
import QuizRatingModel from './QuizRating';
import { privacyValues } from '../constants/privacy';

const QuizSchema = new mongoose.Schema<Quiz>(
	{
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
		},
		privacy: {
			type: {
				type: String,
				enum: privacyValues,
			},
			password: {
				type: String,
				required: false,
			},
			userIds: {
				type: [String],
				required: false,
				default: undefined,
			},
			link: {
				type: String,
				required: false,
			},
		},
	},
	{ timestamps: true },
);


QuizSchema.pre('findOneAndDelete', async function(next) {
	const quiz = this;
	const questionsToDelete = await QuestionModel.find({ quizId: quiz.getQuery()['_id'] });

	if (questionsToDelete.length) {
		await QuestionModel.deleteMany({ quizId: { $in: questionsToDelete.map((question) => question.quizId) }});
		await AnswerModel.deleteMany({ questionId: { $in: questionsToDelete.map((question) => question._id) }});
		await QuizRatingModel.deleteMany({ quizId: { $in: questionsToDelete.map((question) => question.quizId) } });
	}
	next();
})

const QuizModel = mongoose.model<Quiz>('Quiz', QuizSchema);

export default QuizModel;