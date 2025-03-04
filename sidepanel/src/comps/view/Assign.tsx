import React from "react";
import { useAssignInfo } from "$/assign";
import { CourseAssign } from "#cs/fetch/course";

import { Badge } from "react-bootstrap";
import { FileText } from "lucide-react";

import { Loading, Duration } from "@/comps";
import { AssignLink } from "@/comps/link";

export interface AssignProps extends React.HTMLAttributes<HTMLDivElement> {
    assign: CourseAssign;
}

function Assign({ assign: { id, title }, ...props }: AssignProps) {
    const { data: info } = useAssignInfo(id);
    const due = info?.due ? new Date(info.due) : undefined;
    const submit = info?.submit ? new Date(info.submit) : undefined;

    return (
        <div {...props}>
            <div className="d-flex align-items-center">
                <FileText className="me-1 flex-shrink-0" size={20} />
                <AssignLink className="me-2 text-truncate" assign={{ id, title }} />
                <Loading show={!info} />
                {info && (
                    <>
                        <Status due={due} submit={submit} block={info.block} />
                        <Duration className="ms-2" due={due} />
                    </>
                )}
            </div>
        </div>
    );
}

function Status({ due, submit, block }: { due?: Date, submit?: Date, block: boolean }) {
    if (submit) {
        const late = due && submit > due;
        return <Badge bg={late ? "warning" : "success"} text={late ? "dark" : "white"}>제출</Badge>;
    }
    const danger = block || (due && Date.now() > due.getTime());
    return <Badge bg={danger ? "danger" : "primary"}>미제출</Badge>;
}

export default Assign;
