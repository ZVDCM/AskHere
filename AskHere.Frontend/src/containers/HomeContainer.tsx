import DialogComponent from "@components/DialogComponent";
import LoadingComponent from "@components/LoadingComponent";
import {
	useAnswerQuestionMutation,
	useCreateQuestionMutation,
	useDeleteQuestionMutation,
	useUpdateQuestionMutation,
} from "@services/features/account/accountSlice.api";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "src/types/user";
import { IQuestion, IQuestionResponse } from "src/types/question";
import { useGetQuestionsQuery } from "@services/features/questions/questionsSlice.api";
import QuestionComponent from "@components/QuestionComponent";

function HomeContainer({ user }: { user: IUser }) {
	const navigate = useNavigate();
	const [questionAction, setQuestionAction] = useState("");
	const [targetQuestion, setTargetQuestion] = useState({} as IQuestion);
	const [questionsList, setQuestionsList] = useState([] as IQuestion[]);
	const [questionElements, setQuestionElements] = React.useState(
		[] as HTMLDivElement[]
	);

	const { data: questionData, isLoading: isGetQuestionsLoading } =
		useGetQuestionsQuery(null);
	const [
		createQuestion,
		{
			isLoading: isCreateQuestionLoading,
			isError: isCreateQuestionError,
			isSuccess: isCreateQuestionSuccess,
			error: createQuestionError,
		},
	] = useCreateQuestionMutation();
	const [
		updateQuestion,
		{
			isLoading: isUpdateQuestionLoading,
			isError: isUpdateQuestionError,
			isSuccess: isUpdateQuestionSuccess,
			error: updateQuestionError,
		},
	] = useUpdateQuestionMutation();
	const [
		deleteQuestion,
		{
			isLoading: isDeleteQuestionLoading,
			isError: isDeleteQuestionError,
			error: deleteQuestionError,
		},
	] = useDeleteQuestionMutation();

	const [
		answerQuestion,
		{
			isLoading: isAnswerQuestionLoading,
			isError: isAnswerQuestionError,
			isSuccess: isAnswerQuestionSuccess,
			error: answerQuestionError,
		},
	] = useAnswerQuestionMutation();

	const createQuestionRef = useRef({} as HTMLDialogElement);
	const updateQuestionRef = useRef({} as HTMLDialogElement);
	const answerQuestionRef = useRef({} as HTMLDialogElement);

	const createQuestionValueRef = useRef({} as HTMLInputElement);
	const updateQuestionValueRef = useRef({} as HTMLInputElement);
	const answerQuestionValueRef = useRef({} as HTMLInputElement);

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	const handleCreateQuestionSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const value = createQuestionValueRef.current.value;

		if (!value) {
			alert("Please enter a value");
			return;
		}

		createQuestionValueRef.current.value = "";

		createQuestion({
			value,
		}).then((response) => {
			const question = (response as { data: IQuestionResponse }).data.data
				.question;
			setTargetQuestion(question);
			setQuestionsList([question, ...questionsList]);
		});
	};

	const handleUpdateQuestionSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const value = updateQuestionValueRef.current.value;
		const questionId = targetQuestion.id.toString();

		if (!value) {
			alert("Please enter a value");
			return;
		}

		updateQuestionValueRef.current.value = "";

		updateQuestion({
			value,
			questionId,
		}).then((response) => {
			const question = (response as { data: IQuestionResponse }).data.data
				.question;
			setTargetQuestion(question);
			setQuestionsList(
				questionsList.map((q) => (q.id === question.id ? question : q))
			);
		});
	};

	const handleAnswerQuestionSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const value = answerQuestionValueRef.current.value;
		const questionId = targetQuestion.id.toString();

		if (!value) {
			alert("Please enter a value");
			return;
		}

		answerQuestion({ value, questionId });
	};

	// FIND QUESTIONS
	useEffect(() => {
		const elements = Array.from(
			document.getElementsByClassName("question")
		);
		setQuestionElements(elements as HTMLDivElement[]);
	}, [questionsList]);

	// HANDLE QUESTIONS
	useEffect(() => {
		if (Object.keys(targetQuestion).length) {
			updateQuestionValueRef.current.value = targetQuestion.value;

			questionElements.forEach((element) =>
				element.id === targetQuestion.id.toString()
					? element.classList.add("question-selected")
					: element.classList.remove("question-selected")
			);
		}
		switch (questionAction) {
			case "update": {
				updateQuestionRef.current.showModal();
				setQuestionAction("");
				break;
			}
			case "delete": {
				if (confirm("Are you sure you want to delete this question?")) {
					const questionId = targetQuestion.id.toString();
					deleteQuestion({
						questionId,
					}).then((response) => {
						const question = (
							response as { data: IQuestionResponse }
						).data.data.question;
						setQuestionsList(
							questionsList.filter((q) => q.id !== question.id)
						);
					});
				}
				setQuestionAction("");
				break;
			}
			case "":
				break;
			default:
				throw new Error(`Invalid questionAction: ${questionAction}`);
		}
	}, [
		targetQuestion,
		questionAction,
		questionElements,
		deleteQuestion,
		setQuestionAction,
		questionsList,
	]);

	// GET QUESTIONS
	useEffect(() => {
		if (questionData) {
			setQuestionsList(questionData.data.questions);
		}
	}, [questionData]);

	// CREATE QUESTION
	useEffect(() => {
		if (isCreateQuestionSuccess) {
			createQuestionRef.current.close();
		}
		if (isCreateQuestionError && createQuestionError) {
			alert(
				`Create question failed: ${
					(createQuestionError as { data: { message: string } }).data
						.message
				}`
			);
		}
	}, [isCreateQuestionSuccess, isCreateQuestionError, createQuestionError]);

	// DELETE QUESTION
	useEffect(() => {
		if (isDeleteQuestionError && deleteQuestionError) {
			alert(
				`Delete question failed: ${
					(deleteQuestionError as { data: { message: string } }).data
						.message
				}`
			);
		}
	}, [isDeleteQuestionError, deleteQuestionError]);

	// UPDATE QUESTION
	useEffect(() => {
		if (isUpdateQuestionSuccess) {
			updateQuestionRef.current.close();
		}
		if (isUpdateQuestionError && updateQuestionError) {
			alert(
				`Update question failed: ${
					(updateQuestionError as { data: { message: string } }).data
						.message
				}`
			);
		}
	}, [isUpdateQuestionSuccess, isUpdateQuestionError, updateQuestionError]);

	// ANSWER QUESTION
	useEffect(() => {
		if (isAnswerQuestionSuccess) {
			answerQuestionRef.current.close();
		}
		if (isAnswerQuestionError && answerQuestionError) {
			alert(
				`Answer question failed: ${
					(answerQuestionError as { data: { message: string } }).data
						.message
				}`
			);
		}
	}, [isAnswerQuestionSuccess, isAnswerQuestionError, answerQuestionError]);

	return (
		<div className="h-[calc(100dvh-400px)]">
			{(isGetQuestionsLoading ||
				isCreateQuestionLoading ||
				isUpdateQuestionLoading ||
				isDeleteQuestionLoading ||
				isAnswerQuestionLoading) && <LoadingComponent />}
			<DialogComponent dialogRef={createQuestionRef}>
				<section className="flex justify-center items-center">
					<span>Create Question</span>
				</section>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleCreateQuestionSubmit}
				>
					<section>
						<div className="flex flex-col">
							<label htmlFor="create-question-value">Value</label>
							<input
								type="text"
								id="create-question-value"
								className="border p-2"
								ref={createQuestionValueRef}
							/>
						</div>
					</section>
					<hr />
					<section className="flex flex-col gap-2">
						<button type="submit" className="w-full border p-2">
							Create
						</button>
						<button
							type="button"
							className="w-full border p-2"
							onClick={() => createQuestionRef.current.close()}
						>
							Cancel
						</button>
					</section>
				</form>
			</DialogComponent>
			<DialogComponent dialogRef={updateQuestionRef}>
				<section className="flex justify-center items-center">
					<span>Update Question</span>
				</section>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleUpdateQuestionSubmit}
				>
					<section>
						<div className="flex flex-col">
							<label htmlFor="update-question-value">Value</label>
							<input
								type="text"
								id="update-question-value"
								className="border p-2"
								ref={updateQuestionValueRef}
							/>
						</div>
					</section>
					<hr />
					<section className="flex flex-col gap-2">
						<button type="submit" className="w-full border p-2">
							Update
						</button>
						<button
							type="button"
							className="w-full border p-2"
							onClick={() => updateQuestionRef.current.close()}
						>
							Cancel
						</button>
					</section>
				</form>
			</DialogComponent>
			<DialogComponent dialogRef={answerQuestionRef}>
				<section className="flex justify-center items-center">
					<span>Answer Question</span>
				</section>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleAnswerQuestionSubmit}
				>
					<section>
						<div className="flex flex-col">
							<label htmlFor="answer-question-value">Value</label>
							<input
								type="text"
								id="answer-question-value"
								className="border p-2"
								ref={answerQuestionValueRef}
							/>
						</div>
					</section>
					<hr />
					<section className="flex flex-col gap-2">
						<button type="submit" className="w-full border p-2">
							Answer
						</button>
						<button
							type="button"
							className="w-full border p-2"
							onClick={() => answerQuestionRef.current.close()}
						>
							Cancel
						</button>
					</section>
				</form>
			</DialogComponent>
			{user && (
				<div className="h-full max-w-[1200px] mx-auto">
					<article className="h-full flex flex-col">
						<section className="h-[10%] flex justify-between items-center">
							<span>@&nbsp;{user.username}</span>
							<button
								className="hover:underline"
								onClick={handleLogout}
							>
								Logout
							</button>
						</section>
						<hr className="my-4" />
						<section className="h-[90%] flex-1 flex">
							<section
								id="questions"
								className="relative flex-1 overflow-y-auto overflow-x-hidden"
							>
								<button
									className="sticky top-0 left-0 border p-2 mb-2 bg-white"
									onClick={() =>
										createQuestionRef.current.showModal()
									}
								>
									Create Question
								</button>
								<div className="flex flex-col gap-4">
									{questionsList.map((question) => (
										<QuestionComponent
											key={question.id}
											question={question}
											setTargetQuestion={
												setTargetQuestion
											}
											setQuestionAction={
												setQuestionAction
											}
										/>
									))}
								</div>
							</section>
							<section
								id="answers"
								className="relative flex-1 border-l-[1px] overflow-y-auto overflow-x-hidden"
							>
								{Object.keys(targetQuestion).length !== 0 && (
									<button
										id="answer-button"
										className="sticky top-0 border p-2 bg-white m-auto"
										onClick={() =>
											answerQuestionRef.current.showModal()
										}
									>
										Answer Question
									</button>
								)}
								<div className="flex flex-col gap-4"></div>
							</section>
						</section>
					</article>
				</div>
			)}
		</div>
	);
}

export default HomeContainer;
