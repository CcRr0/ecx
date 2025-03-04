import React from "react";
import { CourseAssign } from "#cs/fetch/course";

import TabLink from "./TabLink";

export interface AssignLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    assign: CourseAssign;
}

function AssignLink({ assign: { id, title }, ...props }: AssignLinkProps) {
    const url = `https://learn.hansung.ac.kr/mod/assign/view.php?id=${id}`;
    return (
        <TabLink href={url} {...props}>
            {title}
        </TabLink>
    );
}

export default AssignLink;
