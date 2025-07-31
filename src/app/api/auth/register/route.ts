import UserList from "@/app/models/UserList";
import { connectDB } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export interface IUser {
	name: string;
	email: string;
	password: string;
}

export async function POST(req: Request) {
	await connectDB();
	const { name, email, password }: IUser = await req.json();

	const existingUser = await UserList.findOne({ email });
	if (existingUser) {
		return NextResponse.json({ error: "User already Exists" }, { status: 400 });
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await UserList.create({
		name,
		email,
		password: hashedPassword,
	});
	console.log(newUser);
	return NextResponse.json({ user: newUser });
}
