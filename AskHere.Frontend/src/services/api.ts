import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "https://askhere.prod.dev/api";

const baseQuery = fetchBaseQuery({
	baseUrl,
	prepareHeaders: (headers) => {
		headers.set("Accept", "application/json");
		headers.set("Content-Type", "application/json");
		const token = sessionStorage.getItem("token");
		if (token) headers.set("authorization", `Bearer ${token}`);
		return headers;
	},
});

export const api = createApi({
	reducerPath: "AskHere API",
	baseQuery: baseQuery,
	endpoints: () => ({}),
});
