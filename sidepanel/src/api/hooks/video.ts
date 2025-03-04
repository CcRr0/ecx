import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { sendTab } from "../chrome";

export const videoInfoOptions = (id: number) => ({
    queryKey: ["video", id],
    queryFn: () => sendTab({
        type: "VIDEO_INFO",
        id,
    }),
    staleTime: 30 * 1000,
} satisfies UseQueryOptions);

export function useVideoInfo(id: number) {
    return useQuery(videoInfoOptions(id));
}
