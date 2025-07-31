"use client";

import { ILogin } from "@/app/models/interface/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
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

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<loginFormType>({
		resolver: yupResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: (payload: ILogin) => {},
	});

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8 sm:p-10 shadow-2xl">
				<h2 className="text-3xl font-bold text-center mb-2 text-white">
					Welcome Back 👋
				</h2>
				<p className="text-base text-center text-gray-400 mb-8">
					Please log in to your account
				</p>

				<form className="space-y-6">
					{/* Email Field */}
					<div>
						<label className="block text-lg text-gray-300 font-medium mb-1">
							📧 Email <span className="text-red-500">*</span>
						</label>
						<input
							type="email"
							placeholder="you@example.com"
							className="w-full bg-gray-800 text-white  border border-gray-600 rounded-lg px-4 py-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
							required
						/>
					</div>

					{/* Password Field */}
					<div>
						<label className="block text-lg text-gray-300 font-medium mb-1">
							🔒 Password <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
								required
							/>
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
