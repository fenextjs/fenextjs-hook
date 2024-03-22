import React, { ReactNode, useEffect, useMemo } from "react";
import * as ReactDOM from "react-dom";

export interface useRender {
    children?: ReactNode;
    ref?: HTMLElement | null | undefined;
}

export const useRender = ({ children, ref }: useRender) => {
    const uuid = useMemo(
        () => `${Math.ceil(new Date().getTime() * Math.random())}`,
        [],
    );

    const onLoadChildren = () => {
        if (ref) {
            ref.setAttribute("uuid", uuid);
            ReactDOM.render(<>{children}</>, ref);
        }
    };
    useEffect(onLoadChildren, [children, ref, uuid]);

    return {
        ref,
        uuid,
    };
};
