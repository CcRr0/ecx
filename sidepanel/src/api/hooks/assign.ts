import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { sendTab } from "../chrome";

export const assignInfoOptions = (id: number) => ({
    queryKey: ["assign", id],
    queryFn: () => sendTab({
        type: "ASSIGN_INFO",
        id,
    }),
    staleTime: 30 * 1000,
} satisfies UseQueryOptions);

export function useAssignInfo(id: number) {
    return useQuery(assignInfoOptions(id));
}
