import { Message, Status } from "./response";

export interface IQuestion {
	id: number;
	userId: string;
	userUsername: string;
	value: string;
	createdAt: string;
	updatedAt: string;
}
export interface IQuestionsResponse {
	status: Status;
	message: Message;
	data: { questions: IQuestion };
}
export interface IQuestionResponse {
	status: Status;
	message: Message;
	data: { question: IQuestion };
}

export interface IGetQuestionPayload {
	questionId: string;
}
export interface IGetQuestionAnswersPayload {
	questionId: string;
}
export interface ICreateQuestionPayload {
	value: string;
}
export interface IUpdateQuestionPayload {
	questionId: string;
	value: string;
}
export interface IDeleteQuestionPayload {
	questionId: string;
}
