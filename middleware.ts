import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.headers.get("authorization")?.split(" ")[1];
	if (!token)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		jwt.verify(token, process.env.JWT_SECRET!);
		return NextResponse.next();
	} catch (err) {
		return NextResponse.json({ error: "Invalid token" }, { status: 403 });
	}
}

export const config = {
	matcher: ["/api/users/:path*"],
};
