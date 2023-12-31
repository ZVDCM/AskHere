import React, { useEffect } from "react";
import FooterLayout from "@components/layouts/FooterLayout";
import HeaderLayout from "@components/layouts/HeaderLayout";
import HomeContainer from "@containers/HomeContainer";
import { useGetProfileQuery } from "@services/features/account/accountSlice.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function HomePage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { data, error, isSuccess, isError } = useGetProfileQuery(null);
	useEffect(() => {
		if (isError && error) {
			if ((error as { status: number }).status === 401) {
				navigate("/login");
			}
		}
	}, [data, error, isSuccess, isError, navigate, dispatch]);

	return (
		<div className="flex flex-col">
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
