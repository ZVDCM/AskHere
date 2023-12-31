import React from "react";

function DialogComponent({
	dialogRef,
	children,
}: {
	dialogRef: React.MutableRefObject<HTMLDialogElement>;
	children: React.ReactNode;
}) {
	return (
		<dialog ref={dialogRef} className="m-auto">
			<article className="relative w-[400px] border p-[2rem]">
				<button
					className="w-[50px] h-[50px] absolute top-0 right-0 border-l border-b"
					onClick={() => dialogRef.current.close()}
				>
					X
				</button>
				{children}
			</article>
		</dialog>
	);
}

export default DialogComponent;
