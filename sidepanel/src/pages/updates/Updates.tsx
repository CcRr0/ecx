import Markdown from "react-markdown";
import v0_2_0 from "./log/v0_2_0.md?raw";

import { Title } from "@/comps";

function Updates() {
    return (
        <>
            <Title>업데이트</Title>
            <Markdown>{v0_2_0}</Markdown>
        </>
    );
}

export default Updates;
