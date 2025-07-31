import UserList from "@/app/models/UserList";
import { connectDB } from "@/lib/db";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	await connectDB();
	const { email, password }: { email: string; password: string } =
		await req.json();
	const user = await UserList.findOne({ email });
	if (!user) {
		return NextResponse.json({ error: "User Not found" }, { status: 404 });
	}
	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
	}
	const token = jwt?.sign({ id: user._id }, process.env.JWT_SECRET!, {
		expiresIn: "7d",
	});
	return NextResponse.json({ token });
}
