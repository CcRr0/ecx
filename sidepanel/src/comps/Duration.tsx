import React from "react";
import { formatDate } from "#/utils/format";

import { Badge, BadgeProps } from "react-bootstrap";

export interface DurationProps extends Omit<BadgeProps, "as"> {
    from?: Date;
    due?: Date;
}

function Duration({ from, due, className, ...props }: DurationProps) {
    return (
        <Badge className={`bg-opacity-25 text-opacity-75 ${className}`}
               bg="secondary" text="dark" {...props}>
            {!from && !due && (
                "기한 없음"
            )}
            {(from || due) && (
                <>{from && formatDate(from)} ~ {due && formatDate(due)}</>
            )}
        </Badge>
    );
}

export default Duration;
