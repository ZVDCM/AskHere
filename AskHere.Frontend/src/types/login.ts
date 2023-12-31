import { Token } from "./token";

export interface ILoginPayload {
	email: string;
	password: string;
}

export interface ILoginResponse {
	status: "success" | "error";
	message: string | null;
	data: {
		token: Token;
	};
}
