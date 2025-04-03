import Markdown from "react-markdown";
import { Title } from "@/comps";

import v0_2_1 from "./log/v0_2_1.md?raw";
import v0_2_0 from "./log/v0_2_0.md?raw";

function Updates() {
    return (
        <>
            <Title>업데이트</Title>
            <Markdown>{v0_2_1}</Markdown>
            <Markdown>{v0_2_0}</Markdown>
        </>
    );
}

export default Updates;
