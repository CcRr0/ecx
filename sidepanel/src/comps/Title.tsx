import React, { HTMLAttributes } from "react";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

function Title({ children, className, ...props }: TitleProps) {
    return (
        <h1 className={`mt-3 mb-4 ${className}`} {...props}>
            {children}
        </h1>
    );
}

export default Title;
