export type TypeListenerKeyFunctions = keyof DocumentEventMap;
export type TypeListenerFunctions<K extends TypeListenerKeyFunctions> = (ev: DocumentEventMap[K]) => any;
export type useDocumentEventProps<K extends TypeListenerKeyFunctions> = {
    [id in TypeListenerKeyFunctions]?: TypeListenerFunctions<K>;
};
export declare const useDocumentEvent: <K extends keyof DocumentEventMap = keyof DocumentEventMap>({ ...props }: useDocumentEventProps<K>) => {
    onReload: () => void;
};
