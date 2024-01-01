import React from "react";
import moment from "moment";
import { IAnswer } from "src/types/answer";

function AnswerComponent({ answer }: { answer: IAnswer }) {
	return (
		<>
			{answer && (
				<div
					className="answer flex gap-4 border border-l-0 cursor-pointer"
					id={answer.id.toString()}
				>
					<section className="flex flex-col p-2">
						<span>@{answer.userUsername}</span>
						<div className="text-[0.8rem] text-[gray]">
							<p>{moment(answer.createdAt).format("lll")}</p>
						</div>
					</section>
					<section className="flex-1 border-l p-2">
						<p>{answer.value}</p>
					</section>
				</div>
			)}
		</>
	);
}

export default AnswerComponent;
