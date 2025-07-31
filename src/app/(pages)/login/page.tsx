"use client";

import formApiRepository from "@/app/api/frontend/formApiRepository";
import { ILogin } from "@/app/models/interface/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
	email: yup
		.string()
		.required("Email is required")
		.email("Please enter a valid email"),
	password: yup.string().required("Password is required"),
});

type loginFormType = yup.InferType<typeof schema>;

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);
	const router = useRouter();

	const [user, setUser] = useState(null);

	useEffect(() => {
		const userID = localStorage.getItem("u_id");
		if (!userID) return;
		formApiRepository
			.getLoginUser(userID)
			.then((res) => setUser(res.data))
			.catch((err) => console.error("Failed to get user", err));
	}, []);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<loginFormType>({
		resolver: yupResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: (payload: ILogin) => formApiRepository.postLoginForm(payload),
		onSuccess: () => {
			setSuccessMsg("You login to the system successfully!");
			reset();
			setTimeout(() => {
				setSuccessMsg(null);
			}, 3000);
		},
		onError: () => {
			setSuccessMsg("Failed to log in. Please try again later.");
		},
	});

	const onSubmit = (data: loginFormType) => {
		const payload: ILogin = {
			email: data.email,
			password: data.password,
		};
		mutation.mutate(payload);
		console.log(data);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8 sm:p-10 shadow-2xl">
				<h2 className="text-3xl font-bold text-center mb-2 text-white">
					Welcome Back <p>{user}</p> 👋
				</h2>
				<p className="text-base text-center text-gray-400 mb-8">
					Please log in to your account
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* Email Field */}
					<div>
						<label className="block text-lg text-gray-300 font-medium mb-1">
							📧 Email <span className="text-red-500">*</span>
						</label>
						<input
							{...register("email")}
							type="email"
							placeholder="you@example.com"
							className="w-full bg-gray-800 text-white  border border-gray-600 rounded-lg px-4 py-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
						<p className="text-danger mt-1 fs-14">{errors.email?.message}</p>
					</div>

					{/* Password Field */}
					<div>
						<label className="block text-lg text-gray-300 font-medium mb-1">
							🔒 Password <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<input
								{...register("password")}
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
							/>
							<p className="text-danger mt-1 fs-14">
								{errors.password?.message}
							</p>
							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute right-3 top-3 text-gray-400 text-sm focus:outline-none hover:text-blue-400"
								aria-label="Toggle password visibility"
							>
								{showPassword ? "🙈" : "👁️"}
							</button>
						</div>
					</div>

					{/* Forgot Password */}
					<div className="text-right text-sm">
						<Link
							href="/forgot-password"
							className="text-blue-500 hover:underline"
						>
							Forgot Password?
						</Link>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md"
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
}
