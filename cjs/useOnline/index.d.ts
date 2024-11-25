export interface useOnlineProps {
    onOnline?: () => void;
    onOffline?: () => void;
}
export declare const useOnline: ({ onOffline, onOnline }?: useOnlineProps) => {
    isOnline: boolean;
};
