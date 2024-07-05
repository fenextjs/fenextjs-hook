import { _tValidate } from "fenextjs-functions";
import { _TProps } from "fenextjs-interface";
import { useCallback } from "react";

export interface use_TProps extends _TProps {}

export const use_T = ({ _t: _tProps, useT = true }: use_TProps) => {
    const _t = useCallback(
        (message: any) =>
            _tValidate(message, useT !== false ? _tProps : undefined),
        [_tProps, useT],
    );

    return {
        _t,
    };
};
