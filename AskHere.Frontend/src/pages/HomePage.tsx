import React, { useEffect } from "react";
import FooterLayout from "@components/layouts/FooterLayout";
import HeaderLayout from "@components/layouts/HeaderLayout";
import HomeContainer from "@containers/HomeContainer";
import { useGetProfileQuery } from "@services/features/account/accountSlice.api";
import { useNavigate } from "react-router-dom";

function HomePage() {
	const navigate = useNavigate();
	const { data, error, isSuccess, isError } = useGetProfileQuery(null);
	useEffect(() => {
		if (sessionStorage.getItem("token") === null) {
			navigate("/login");
		}
		if (isError && error) {
			if ((error as { status: number }).status === 401) {
				navigate("/login");
			}
		}
	}, [data, error, isSuccess, isError, navigate]);

	return (
		<div>
			{isSuccess && data && (
				<>
					<HeaderLayout header={"Q&A"} />
					<HomeContainer user={data?.data.user} />
					<FooterLayout />
				</>
			)}
		</div>
	);
}

export default HomePage;
