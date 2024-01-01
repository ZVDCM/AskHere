import LoadingComponent from "@components/LoadingComponent";
import { useRegisterMutation } from "@services/features/auth/authSlice.api";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function RegisterContainer() {
	const navigate = useNavigate();

	const [register, { isLoading, isError, isSuccess, data, error }] =
		useRegisterMutation();

	const usernameRef = useRef({} as HTMLInputElement);
	const emailRef = useRef({} as HTMLInputElement);
	const passwordRef = useRef({} as HTMLInputElement);
	const confirmPasswordRef = useRef({} as HTMLInputElement);

	useEffect(() => {
		if (isSuccess) {
			alert("Registration successful");
			navigate("/login");
		}
		if (isError && error) {
			alert(
				`Registration failed: ${
					(error as { data: { message: string } }).data.message
				}`
			);
		}
	}, [isSuccess, isError, data, error, navigate]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const username = usernameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const password_confirmation = confirmPasswordRef.current.value;

		if (!username || !email || !password || !password_confirmation) {
			alert("Please fill in all fields");
			return;
		}

		if (password !== password_confirmation) {
			alert("Passwords do not match");
			return;
		}

		register({
			username,
			email,
			password,
			password_confirmation,
		});
	};

	return (
		<div className="h-[calc(100dvh-400px)] flex  justify-center items-center">
			{isLoading && <LoadingComponent />}
			<article className="w-[400px] border p-[2rem]">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<section className="flex flex-col gap-2">
						<div className="flex flex-col">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								id="username"
								className="border p-2"
								ref={usernameRef}
								required
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								className="border p-2"
								ref={emailRef}
								required
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								className="border p-2"
								ref={passwordRef}
								required
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="password_confirmation">
								Confirm Password
							</label>
							<input
								type="password"
								id="password_confirmation"
								className="border p-2"
								ref={confirmPasswordRef}
								required
							/>
						</div>
					</section>
					<hr />
					<section className="flex flex-col gap-2">
						<button type="submit" className="w-full border p-2">
							Register
						</button>
						<div className="w-full flex justify-center border">
							<a href="/" className="w-full text-center p-2">
								Cancel
							</a>
						</div>
					</section>
				</form>
			</article>
		</div>
	);
}

export default RegisterContainer;
