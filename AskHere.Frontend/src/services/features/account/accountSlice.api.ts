import { api } from "@services/api";
import { IAnswerPayload } from "src/types/answer";
import {
	ICreateQuestionPayload,
	IDeleteQuestionPayload,
	IUpdateQuestionPayload,
} from "src/types/question";

const accountEndpoint = api.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query({
			query: () => ({
				url: "account",
				method: "GET",
			}),
		}),
		createQuestion: builder.mutation({
			query: (payload: ICreateQuestionPayload) => ({
				url: "account/questions",
				method: "POST",
				body: payload,
			}),
		}),
		updateQuestion: builder.mutation({
			query: (payload: IUpdateQuestionPayload) => ({
				url: `account/questions/${payload.questionId}`,
				method: "PATCH",
				body: { value: payload.value },
			}),
		}),
		deleteQuestion: builder.mutation({
			query: (payload: IDeleteQuestionPayload) => ({
				url: `account/questions/${payload.questionId}`,
				method: "DELETE",
			}),
		}),
		answerQuestion: builder.mutation({
			query: (payload: IAnswerPayload) => ({
				url: `account/answer/questions/${payload.questionId}`,
				method: "POST",
				body: { value: payload.value },
			}),
		}),
	}),
});

export const {
	useGetProfileQuery,
	useCreateQuestionMutation,
	useUpdateQuestionMutation,
	useDeleteQuestionMutation,
	useAnswerQuestionMutation,
} = accountEndpoint;
