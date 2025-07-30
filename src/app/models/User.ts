import mongoose, { Document, Model } from "mongoose";

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

const User: Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
