import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { sendTab } from "../chrome";

export const courseListOptions = {
    queryKey: ["course", "list"],
    queryFn: () => sendTab({
        type: "COURSE_LIST",
    }),
    staleTime: Infinity,
} satisfies UseQueryOptions;

export const courseCurrentOptions = (id: number) => ({
    queryKey: ["course", "id", id],
    queryFn: () => sendTab({
        type: "COURSE_CURRENT",
        id,
    }),
    staleTime: 60 * 1000,
} satisfies UseQueryOptions);

export function useCourseList() {
    return useQuery(courseListOptions);
}

export function useCourseCurrent(id: number) {
    return useQuery(courseCurrentOptions(id));
}
