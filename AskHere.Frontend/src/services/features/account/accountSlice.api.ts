import { api } from "@services/api";

const accountEndpoint = api.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query({
			query: () => ({
				url: "account",
				method: "GET",
			}),
		}),
	}),
});

export const { useGetProfileQuery } = accountEndpoint;
