import { api } from "@services/api";
import {
	IGetQuestionAnswersPayload,
	IGetQuestionPayload,
} from "src/types/question";

const questionsEndpoints = api.injectEndpoints({
	endpoints: (builder) => ({
		getQuestions: builder.query({
			query: () => ({
				url: "questions",
				method: "GET",
			}),
		}),
		getQuestion: builder.query({
			query: (payload: IGetQuestionPayload) => ({
				url: `questions/${payload.questionId}`,
				method: "GET",
			}),
		}),
		getQuestionAnswers: builder.query({
			query: (payload: IGetQuestionAnswersPayload) => ({
				url: `questions/${payload.questionId}/answers`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetQuestionsQuery,
	useGetQuestionQuery,
	useGetQuestionAnswersQuery,
} = questionsEndpoints;
