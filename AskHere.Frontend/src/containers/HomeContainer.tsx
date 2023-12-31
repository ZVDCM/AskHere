import React from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "src/types/user";

function HomeContainer({ user }: { user: IUser }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div className="h-[calc(100dvh-400px)]">
			{user && (
				<div className="h-full w-[700px] mx-auto">
					<article className="h-full flex flex-col">
						<section className="flex justify-between items-center">
							<span>@&nbsp;{user.username}</span>
							<button
								className="hover:underline"
								onClick={handleLogout}
							>
								Logout
							</button>
						</section>
						<hr className="my-4" />
						<section className="flex-1 self-stretch flex">
							<section
								id="questions"
								className="relative flex-1 overflow-y-auto"
							>
								<button className="absolute top-0 left-0 border p-2">
									+&nbsp;create question
								</button>
							</section>
							<section
								id="answers"
								className="relative flex-1 overflow-y-auto border-l-[1px]"
							>
								<button className="absolute top-0 right-0 border p-2">
									+&nbsp;answer question
								</button>
							</section>
						</section>
					</article>
				</div>
			)}
		</div>
	);
}

export default HomeContainer;
