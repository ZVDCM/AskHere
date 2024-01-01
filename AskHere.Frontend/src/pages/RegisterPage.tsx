import React from "react";
import HeaderLayout from "@components/layouts/HeaderLayout";
import FooterLayout from "@components/layouts/FooterLayout";
import RegisterContainer from "@containers/RegisterContainer";

function RegisterPage() {
	return (
		<div>
			<HeaderLayout header={"REGISTER"} />
			<RegisterContainer />
			<FooterLayout />
		</div>
	);
}

export default RegisterPage;
