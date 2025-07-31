import UserList from "@/app/models/UserList";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	await connectDB();
	const users = await UserList.find();
	return NextResponse.json(users);
}

export async function POST(req: Request) {
	await connectDB();
	const data: { name: string; email: string; password: string } =
		await req.json();
	const user = await UserList.create(data);
	return NextResponse.json(user);
}
