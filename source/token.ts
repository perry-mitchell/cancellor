import { CancelToken } from "./types";

export function createToken(): CancelToken {
    const onCancelCallbacks = [];
    let cancelled = false;
    return {
        cancel: () => {
            if (cancelled) return;
            cancelled = true;
            for (const cb of onCancelCallbacks) {
                cb();
            }
        },
        isCancelled: () => cancelled,
        onCancel: (callback: () => void) => {
            if (onCancelCallbacks.indexOf(callback) >= 0) {
                throw new Error("Callback already registered");
            }
            onCancelCallbacks.push(callback);
            let timeout: ReturnType<typeof setTimeout>;
            if (cancelled) {
                timeout = setTimeout(callback, 0);
            }
            return () => {
                clearTimeout(timeout);
                const ind = onCancelCallbacks.indexOf(callback);
                if (ind >= 0) {
                    onCancelCallbacks.splice(ind, 1);
                }
            };
        },
        throwIfCancelled: (msg?: string) => {
            if (cancelled) {
                throw new Error(msg || "Token was cancelled");
            }
        }
    };
}
