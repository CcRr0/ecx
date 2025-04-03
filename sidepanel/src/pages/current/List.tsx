import { useCourseCurrent, useCourseList } from "$/course";
import { useCourseSummary } from "$/summary";
import { useVideoList } from "$/video";

import { CourseInfo } from "#cs/fetch/course";
import { summarize } from "@/utils/summary";

import { Accordion, Badge } from "react-bootstrap";
import { Loading, Percent } from "@/comps";

import { CourseLink } from "@/comps/link";
import { Video, Assign, Quiz } from "@/comps/view";

import "./List.scss";

function List() {
    const { data: list } = useCourseList();

    return (
        <Accordion className="mb-3" alwaysOpen>
            {list && list.map(({ id, title }) => (
                <Detail key={id} id={id} title={title} />
            ))}
        </Accordion>
    );
}

function Detail({ id, title }: CourseInfo) {
    const { data: current } = useCourseCurrent(id);
    const { data: summary } = useCourseSummary(id);
    const { data: videoList } = useVideoList(id);

    const week = current && current.week;
    const videoInfos = videoList && week && videoList[week];

    const [now, max] = summary ? summarize(summary) : [null, null];

    return (
        <Accordion.Item eventKey={String(id)}>
            <Accordion.Header>
                <CourseLink className="me-2" course={{ id, title }} />
                <Loading show={!summary} />
                {summary && max !== 0 && (
                    <Percent now={now!} max={max!} />
                )}
                {summary && max === 0 && (
                    <Badge bg="secondary">과제 없음</Badge>
                )}
            </Accordion.Header>
            {current && max !== 0 && (
                <Accordion.Body>
                    {videoInfos && current.video.map((video, i) => (
                        <Video key={video.id} className="mb-2" video={video} info={videoInfos[i]} />
                    ))}
                    {current.video.length > 0 && current.assign.length > 0 && (
                        <div className="mb-1" />
                    )}
                    {current.assign.map(assign => (
                        <Assign key={assign.id} className="mb-2" assign={assign} />
                    ))}
                    {current.assign.length > 0 && current.quiz.length > 0 && (
                        <div className="mb-1" />
                    )}
                    {current.quiz.map(quiz => (
                        <Quiz key={quiz.id} className="mb-2" quiz={quiz} />
                    ))}
                </Accordion.Body>
            )}
        </Accordion.Item>
    );
}

export default List;
