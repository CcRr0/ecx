import { formatFrac } from "@/utils/format";
import { Badge, BadgeProps } from "react-bootstrap";

export interface RatioProps extends BadgeProps {
    now: number;
    max: number;
    digits?: number;
}

function Percent({ now, max, digits, ...props }: RatioProps) {
    return (
        <Badge bg={now === max ? "success" : "warning"}
               text={now === max ? "white" : "dark"}
               {...props}>
            {formatFrac(now, max, digits)}
        </Badge>
    );
}

export default Percent;
