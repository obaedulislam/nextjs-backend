import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

const UserList =
	mongoose.models["user_lists"] ||
	mongoose.model<IUser>("user_lists", UserSchema);
export default UserList;
