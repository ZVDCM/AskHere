import React from "react";
import LoginContainer from "@containers/LoginContainer";
import HeaderLayout from "@components/layouts/HeaderLayout";
import FooterLayout from "@components/layouts/FooterLayout";

function LoginPage() {
	return (
		<div className="flex flex-col">
			<HeaderLayout header={"LOGIN"} />
			<LoginContainer />
			<FooterLayout />
		</div>
	);
}

export default LoginPage;
