"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import formApiRepository from "./api/frontend/formApiRepository";

export default function Home() {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const userID = localStorage.getItem("u_id");
		if (!userID) {
			router.push("/login");
			return;
		}
		formApiRepository
			.getLoginUser(userID)
			.then((res) => setUser(res.data))
			.catch((err) => console.error("Failed to get user", err));
	}, []);
	if (!user) return <p>Loading...</p>;

	return (
		<>
			<div>
				<h2>Hello, {user}</h2>
				<p>Email: {user}</p>
			</div>
		</>
	);
}
