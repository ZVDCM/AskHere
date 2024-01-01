import moment from "moment";
import React from "react";
import { IQuestion } from "src/types/question";

function QuestionComponent({
	question,
	setTargetQuestion,
	setQuestionAction,
	userId,
}: {
	question: IQuestion;
	setTargetQuestion: React.Dispatch<React.SetStateAction<IQuestion>>;
	setQuestionAction: React.Dispatch<React.SetStateAction<string>>;
	userId: string;
}) {
	const handleClick = () => {
		setTargetQuestion(question);
	};
	const handleUpdate = () => {
		setQuestionAction("update");
	};
	const handleDelete = () => {
		setQuestionAction("delete");
	};
	return (
		<>
			{question && (
				<div
					className="question flex gap-4 border border-r-0 cursor-pointer"
					id={question.id.toString()}
					onClick={handleClick}
				>
					<section className="flex flex-col p-2">
						<span>@{question.userUsername}</span>
						<div className="text-[0.8rem] text-[gray]">
							<p>{moment(question.createdAt).format("lll")}</p>
							{question.updatedAt !== question.createdAt && (
								<p>
									{moment(question.updatedAt).format("lll")}
								</p>
							)}
						</div>
					</section>
					<section className="flex-1 border-l p-2">
						<p>{question.value}</p>
					</section>
					{userId === question.userId && (
						<section className="border-l flex p-2 gap-2">
							<button
								className="flex-1 border p-2"
								onClick={handleUpdate}
							>
								Update
							</button>
							<button
								className="flex-1 border p-2"
								onClick={handleDelete}
							>
								Delete
							</button>
						</section>
					)}
				</div>
			)}
		</>
	);
}

export default QuestionComponent;
