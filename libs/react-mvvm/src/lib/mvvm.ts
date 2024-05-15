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

export const DefaultViewModelProvider = createViewModelProvider({});

export function createViewModelProvider({
    maxCachedViewModels,
}: {
    maxCachedViewModels?: number;
}): <T>(params: {
    key: string;
    dependencies: unknown[];
    create: () => ViewModel<T>;
}) => ViewModel<T> {
    const cache: {
        key: string;
        dependencies: unknown[];
        viewModel: ViewModel<unknown>;
    }[] = [];

    return <T>({
        key,
        dependencies,
        create,
    }: {
        key: string;
        dependencies: unknown[];
        create: () => ViewModel<T>;
    }): ViewModel<T> => {
        const cachedItem = cache.find(
            item =>
                item.key === key &&
                areArraysEqual(item.dependencies, dependencies),
        );

        if (cachedItem) {
            return cachedItem.viewModel as ViewModel<T>;
        }

        if (!!maxCachedViewModels && cache.length >= maxCachedViewModels) {
            cache.splice(0, 1);
        }

        const viewModel = create();
        cache.push({ key, dependencies, viewModel });

        return viewModel;
    };
}

function areArraysEqual(arr1: unknown[], arr2: unknown[]): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
