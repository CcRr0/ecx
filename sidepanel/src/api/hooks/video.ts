import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { sendTab } from "../chrome";

export const videoListOptions = (id: number) => ({
    queryKey: ["video", id],
    queryFn: () => sendTab({
        type: "VIDEO_LIST",
        id,
    }),
    staleTime: 30 * 1000,
} satisfies UseQueryOptions);

export function useVideoList(id: number) {
    return useQuery(videoListOptions(id));
}
