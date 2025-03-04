import { Badge, BadgeProps } from "react-bootstrap";

export interface LoadingProps extends Omit<BadgeProps, "as"> {
    show: boolean;
}

function Loading({ show, ...props }: LoadingProps) {
    if (!show) {
        return null;
    }
    return (
        <Badge {...props}>
            로드 중...
        </Badge>
    );
}

export default Loading;
