import User from "@/app/models/User";
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
	console.log(req?.body?.getReader);
	const { name, email, password }: IUser = await req.json();

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return NextResponse.json({ error: "User already Exists" }, { status: 400 });
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({ name, email, password: hashedPassword });
	return NextResponse.json({ user: newUser });
}
