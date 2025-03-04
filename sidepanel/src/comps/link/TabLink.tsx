import React, { MouseEventHandler } from "react";

export interface TabLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

function TabLink({ href, ...props }: TabLinkProps) {
    const handleClick: MouseEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        void chrome.tabs.update({
            url: href,
        });
    };

    return (
        <a href={href} onClick={handleClick} {...props} />
    );
}

export default TabLink;
