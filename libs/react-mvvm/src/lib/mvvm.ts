import { useEffect, useState } from 'react';

type ViewModel<T> = {
    getState(): T;
    setState(newState: Partial<T>): void;
    subscribe(listener: Listener<T>): () => void;
    dispose(): void;
};

type ExtendViewModel<E> = E extends never
    ? {}
    : Omit<E, keyof ViewModel<unknown>>;

type Listener<T> = (state: T) => void;

type SelectorFunc = <T, S>(
    viewModel: ViewModel<T>,
    selector: (viewModel: ViewModel<T>) => S,
) => S;

export function createViewModel<T, E extends object = {}>(
    initialState: T,
    extend?: (viewModel: ViewModel<T>) => E,
): ViewModel<T> & ExtendViewModel<E> {
    let state: T = initialState;
    const listeners: Set<Listener<T>> = new Set();

    function getState(): T {
        return state;
    }

    function setState(newState: Partial<T>): void {
        state = { ...state, ...newState };
        notifyListeners();
    }

    function subscribe(listener: Listener<T>): () => void {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    }

    function dispose(): void {
        listeners.clear();
    }

    function notifyListeners(): void {
        for (const listener of listeners) {
            listener(state);
        }
    }

    const vm = {
        getState,
        setState,
        subscribe,
        dispose,
    };

    const extended = extend?.(vm) ?? {};
    return {
        ...extended,
        ...vm,
    } as ViewModel<T> & ExtendViewModel<E>;
}

export const useSelector: SelectorFunc = (data, selector) => {
    const [state, setState] = useState(selector(data));

    useEffect(() => {
        const unsubscribe = data.subscribe(() => {
            const newValue = selector(data);
            setState(newValue);
        });

        return () => unsubscribe();
    }, [data, selector]);

    return state;
};
