import UserList from "@/app/models/UserList";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connectDB();
	const user = await UserList.findById(params.id);
	return NextResponse.json(user);
}

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connectDB();
	const data: { name?: string; email?: string; password?: string } =
		await req.json();
	const updatedUser = await UserList.findByIdAndUpdate(params.id, data, {
		new: true,
	});
	return NextResponse.json(updatedUser);
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connectDB();
	await UserList.findByIdAndDelete(params.id);
	return NextResponse.json({ message: "User Deleted" });
}
