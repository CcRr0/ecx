import React from "react";
import { useQuizInfo } from "$/quiz";
import { CourseQuiz } from "#cs/fetch/course";

import { Badge } from "react-bootstrap";
import { ClipboardCheck } from "lucide-react";

import { Loading, Duration } from "@/comps";
import { QuizLink } from "@/comps/link";

export interface QuizProps extends React.HTMLAttributes<HTMLDivElement> {
    quiz: CourseQuiz;
}

function Quiz({ quiz: { id, title }, ...props }: QuizProps) {
    const { data: info } = useQuizInfo(id);
    const from = info?.from ? new Date(info.from) : undefined;
    const due = info?.due ? new Date(info.due) : undefined;
    const submit = info?.submit ? new Date(info.submit) : undefined;

    return (
        <div {...props}>
            <div className="d-flex align-items-center">
                <ClipboardCheck className="me-1 flex-shrink-0" size={20} />
                <QuizLink className="me-2 text-truncate" quiz={{ id, title }} />
                <Loading show={!info} />
                {info && (
                    <>
                        <Status from={from} due={due} submit={submit} />
                        <Duration className="ms-2" from={from} due={due} />
                    </>
                )}
            </div>
        </div>
    );
}

function Status({ from, due, submit }: { from?: Date, due?: Date, submit?: Date }) {
    if (submit) {
        return <Badge bg="success">제출</Badge>;
    }
    const now = Date.now();
    if (from && now < from.getTime()) {
        return <Badge bg="secondary">시작 전</Badge>;
    }
    const danger = due && now > due.getTime();
    return <Badge bg={danger ? "danger" : "primary"}>미제출</Badge>;
}

export default Quiz;
