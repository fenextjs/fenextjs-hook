import { ReactNode } from "react";
export interface useRender {
    children?: ReactNode;
    ref?: HTMLElement | null | undefined;
}
export declare const useRender: ({ children, ref }: useRender) => {
    ref: HTMLElement | null | undefined;
    uuid: string;
};
