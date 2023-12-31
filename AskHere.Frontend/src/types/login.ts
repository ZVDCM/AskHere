import { Message, Status } from "./response";
import { Token } from "./token";

export interface ILoginPayload {
	email: string;
	password: string;
}

export interface ILoginResponse {
	status: Status;
	message: Message;
	data: {
		token: Token;
	};
}
