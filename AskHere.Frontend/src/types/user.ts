import { Message, Status } from "./response";

export interface IUser {
	id: string;
	username: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}
export interface IUserResponse {
	status: Status;
	message: Message;
	data: { user: IUser };
}
