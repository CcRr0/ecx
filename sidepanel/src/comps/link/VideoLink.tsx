import React, { MouseEventHandler } from "react";

const Vod = "width=640,height=368,toolbar=no,location=no,menubar=no,copyhistory=no,status=no,directories=no,scrollbars=yes,resizable=yes";
const Laby = "width=900,height=600,toolbar=no,location=no,menubar=no,copyhistory=no,status=no,directories=no,scrollbars=yes,resizable=yes";

export interface VideoLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    video: number | null;
    laby: number | null;
}

function VideoLink({ video, laby, ...props }: VideoLinkProps) {
    if (!video) {
        return (
            <a onClick={() => false} style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "text",
            }}  {...props} />
        );
    }

    const url = laby
        ? `https://learn.hansung.ac.kr/mod/laby/viewer.php?i=${laby}`
        : `https://learn.hansung.ac.kr/mod/vod/viewer.php?id=${video}`;
    const href = laby
        ? `https://learn.hansung.ac.kr/mod/laby/view.php?id=${video}`
        : `https://learn.hansung.ac.kr/mod/vod/view.php?id=${video}`;

    const handleClick: MouseEventHandler = (e) => {
        e.preventDefault();
        window.open(url, "", laby ? Laby : Vod);
    };

    return (
        <a href={href} onClick={handleClick} {...props} />
    );
}

export default VideoLink;
