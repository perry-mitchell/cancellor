export interface CancelToken {
    cancel: () => void;
    isCancelled: () => boolean;
    onCancel: (callback: () => void) => () => void;
    throwIfCancelled: (msg?: string) => void;
}
