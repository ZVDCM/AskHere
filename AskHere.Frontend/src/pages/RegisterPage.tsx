import React from "react";
import HeaderLayout from "@components/layouts/HeaderLayout";
import FooterLayout from "@components/layouts/FooterLayout";
import RegisterContainer from "@containers/RegisterContainer";

function RegisterPage() {
	return (
		<div className="flex flex-col relative">
			<HeaderLayout header={"REGISTER"} />
			<RegisterContainer />
			<FooterLayout />
		</div>
	);
}

export default RegisterPage;
