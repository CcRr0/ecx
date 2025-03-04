import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { sendTab } from "../chrome";

export const quizInfoOptions = (id: number) => ({
    queryKey: ["quiz", id],
    queryFn: () => sendTab({
        type: "QUIZ_INFO",
        id,
    }),
    staleTime: 30 * 1000,
} satisfies UseQueryOptions);

export function useQuizInfo(id: number) {
    return useQuery(quizInfoOptions(id));
}
