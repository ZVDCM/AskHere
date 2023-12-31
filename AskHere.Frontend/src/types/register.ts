import { Token } from "./token";

export interface IRegisterPayload {
	username: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface IRegisterResponse {
	status: "success" | "error";
	message: string | null;
	data: {
		token: Token;
	};
}
