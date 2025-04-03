import React from "react";

import { CourseVideo } from "#cs/fetch/course";
import { VideoInfo } from "#cs/fetch/video";
import { formatSec } from "@/utils/format";

import { Badge, ProgressBar } from "react-bootstrap";
import { Clapperboard } from "lucide-react";

import { Loading, Duration } from "@/comps";
import { VideoLink } from "@/comps/link";

export interface VideoProps extends React.HTMLAttributes<HTMLDivElement> {
    video: CourseVideo;
    info: VideoInfo;
}

function Video({ video: { title, id, laby, from: fromIso, due: dueIso }, info, ...props }: VideoProps) {
    if (title !== info.title) {
        return null;
    }
    const { actual, required } = info;

    const from = new Date(fromIso);
    const due = new Date(dueIso);

    return (
        <div {...props}>
            <div className="d-flex align-items-center">
                <Clapperboard className="me-1 flex-shrink-0" size={20} />
                <VideoLink className="me-2 text-truncate" video={id} laby={laby}>{title}</VideoLink>
                <Loading show={!info} />
                {info && (
                    <Status actual={actual!} required={required!} from={from} due={due} />
                )}
                <Duration className="ms-2" from={from} due={due} />
            </div>
            <Progress now={actual} max={required} />
        </div>
    );
}

function Status({ actual, required, from, due }: { actual: number, required: number, from: Date, due: Date }) {
    if (actual >= required) {
        return <Badge bg="success">출석</Badge>;
    }
    const now = Date.now();
    if (now < from.getTime()) {
        return <Badge bg="secondary">시작 전</Badge>;
    } else if (now > due.getTime()) {
        return <Badge bg="danger">결석</Badge>;
    }
    return <Badge>기간</Badge>;
}

function Progress({ now, max }: { now: number | null, max: number | null }) {
    const loaded = now !== null && max !== null;
    const rem = loaded ? Math.max(max - now, 0) : null;

    const nowLabel = loaded && formatSec(now, false);
    const remLabel = loaded && `-${formatSec(rem!, false)}`;

    return (
        <ProgressBar>
            <ProgressBar
                now={now ?? 0} max={max ?? 1}
                variant={rem === 0 ? "success" : "primary"}
                label={<b>{nowLabel}</b>} />
            <ProgressBar
                className="bg-opacity-25 text-dark text-opacity-75" variant="secondary"
                now={rem ?? 0} max={max ?? 1}
                label={<b>{remLabel}</b>}
            />
        </ProgressBar>
    );
}

export default Video;
