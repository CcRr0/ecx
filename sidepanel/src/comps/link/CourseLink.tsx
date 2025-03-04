import React from "react";
import { CourseInfo } from "#cs/fetch/course";

import TabLink from "./TabLink";

export interface CourseLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    course: CourseInfo;
}

function CourseLink({ course: { id, title }, ...props }: CourseLinkProps) {
    const url = `https://learn.hansung.ac.kr/course/view.php?id=${id}`;
    return (
        <TabLink href={url} {...props}>
            {title}
        </TabLink>
    );
}

export default CourseLink;
