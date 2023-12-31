import { api } from "@services/api";
import { ILoginPayload } from "src/types/login";
import { IRegisterPayload } from "src/types/register";

const authEndpoint = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (payload: ILoginPayload) => ({
				url: "auth/login",
				method: "POST",
				body: payload,
			}),
            
		}),
		register: builder.mutation({
			query: (payload: IRegisterPayload) => ({
				url: "auth/register",
				method: "POST",
				body: payload,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: "auth/logout",
				method: "POST",
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
	authEndpoint;
