import { Message, Status } from "./response";
import { Token } from "./token";

export interface IRegisterPayload {
	username: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface IRegisterResponse {
	status: Status;
	message: Message;
	data: {
		token: Token;
	};
}
