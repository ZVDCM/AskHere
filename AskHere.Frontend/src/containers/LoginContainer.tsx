import LoadingComponent from "@components/LoadingComponent";
import { useLoginMutation } from "@services/features/auth/authSlice.api";
import React, { useEffect, useRef } from "react";

function LoginContainer() {
	const [login, { isLoading, isError, isSuccess, data, error }] =
		useLoginMutation();
	const emailRef = useRef({} as HTMLInputElement);
	const passwordRef = useRef({} as HTMLInputElement);

	useEffect(() => {
		if (isSuccess) {
			sessionStorage.setItem("token", data.data.token);
			window.location.href = "/";
		}
		if (isError && error) {
			alert(
				`Login failed: ${
					(error as { data: { message: string } }).data.message
				}`
			);
		}
	}, [isSuccess, isError, data, error]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		login({
			email,
			password,
		});
	};

	return (
		<div className="h-[calc(100dvh-400px)] flex justify-center items-center">
			{isLoading && <LoadingComponent />}
			<div className="flex flex-col gap-4 items-center translate-y-[-4rem]">
				<p>
					Not a member?{" "}
					<a href="register" className="hover:underline">
						Register
					</a>
				</p>
				<article className="w-[400px] border p-[2rem]">
					<form
						className="flex flex-col gap-4"
						onSubmit={handleSubmit}
					>
						<section className="flex flex-col gap-4">
							<div className="flex flex-col">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									className="border p-2"
									ref={emailRef}
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									className="border p-2"
									ref={passwordRef}
								/>
							</div>
						</section>
						<hr />
						<section>
							<button type="submit" className="w-full border p-2">
								Login
							</button>
						</section>
					</form>
				</article>
			</div>
		</div>
	);
}

export default LoginContainer;
