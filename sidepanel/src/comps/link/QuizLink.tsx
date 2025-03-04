import React from "react";
import { CourseQuiz } from "#cs/fetch/course";

import TabLink from "./TabLink";

export interface QuizLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    quiz: CourseQuiz;
}

function QuizLink({ quiz: { id, title }, ...props }: QuizLinkProps) {
    const url = `https://learn.hansung.ac.kr/mod/quiz/view.php?id=${id}`;
    return (
        <TabLink href={url} {...props}>
            {title}
        </TabLink>
    );
}

export default QuizLink;
