import React from "react";

function HeaderLayout({ header }: { header: string }) {
	return (
		<header className="h-[200px] flex justify-center items-center flex-col">
			<span className="text-[1rem]">ASK HERE</span>
			<h1 className="text-[5rem] leading-[4rem]">{header}</h1>
		</header>
	);
}

export default HeaderLayout;
