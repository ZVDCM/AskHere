import { Message, Status } from "./response";

export interface IAnswer {
	id: number;
	userId: string;
	userUsername: string;
	questionId: number;
	value: string;
	createdAt: string;
	updateAt: string;
}

export interface IAnswerPayload {
	questionId: string;
	value: string;
}

export interface IAnswerResponse {
	status: Status;
	message: Message;
	data: { answer: IAnswer };
}
