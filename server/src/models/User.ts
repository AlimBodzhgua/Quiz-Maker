import mongoose from 'mongoose';
import { IUser } from '../types/types';

const UserSchema = new mongoose.Schema<IUser>({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
})

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;