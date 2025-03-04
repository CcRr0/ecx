import { useCourseSummaries } from "$/summary";
import { summarize } from "@/utils/summary";

import { Badge } from "react-bootstrap";
import { Title, Loading, Percent } from "@/comps";

import Summary from "./Summary";
import List from "./List";

function Current() {
    const { data: summary } = useCourseSummaries();
    const [now, max] = summary ? summarize(summary) : [null, null];

    return (
        <>
            <Title>
                과제 진행도
                <Loading className="ms-2 fs-6" show={!summary} />
                {summary && max !== 0 && (
                    <Percent className="ms-2 fs-6" now={now!} max={max!} />
                )}
                {summary && max === 0 && (
                    <Badge className="ms-2 fs-6" bg="secondary">과제 없음</Badge>
                )}
            </Title>
            <Summary />
            <List />
        </>
    );
}

export default Current;
