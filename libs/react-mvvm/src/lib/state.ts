import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useCallback,
} from 'react';

type ResetFunc = () => void;

const globalState = new Map<string, any>();

const globalStateListeners = new Map<string, (() => void)[]>();

export function useRememberState<State>({
    id,
    initialState,
}: {
    id: string;
    initialState: State;
}): [State, Dispatch<SetStateAction<State>>, ResetFunc] {
    const state = globalState.has(id) ? globalState.get(id) : initialState;

    const [, setChangesCounter] = useState(0);

    useEffect(() => {
        const handler = () => {
            setChangesCounter(prev => prev + 1);
        };

        if (!globalStateListeners.has(id)) {
            globalStateListeners.set(id, []);
        }

        globalStateListeners.get(id)?.push(handler);

        return () => {
            const listeners = globalStateListeners.get(id);
            if (listeners) {
                globalStateListeners.set(
                    id,
                    listeners.filter(x => x !== handler),
                );
            }
        };
    }, [id]);

    const setState = useCallback(
        (newState: State | ((prev: State) => State)) => {
            if (newState instanceof Function) {
                const updatedState = newState(state);
                globalState.set(id, updatedState);
            } else {
                globalState.set(id, newState);
            }

            // inform listeners
            globalStateListeners.get(id)?.forEach(listener => {
                listener();
            });

            // trigger re-render
            setChangesCounter(prev => prev + 1);
        },
        [id, state],
    );

    const resetState = () => {
        globalState.delete(id);

        // inform listeners
        globalStateListeners.get(id)?.forEach(listener => {
            listener();
        });

        // trigger re-render
        setChangesCounter(prev => prev + 1);
    };

    useEffect(() => {
        if (!globalState.has(id)) {
            setState(initialState);
        }
    }, [id, initialState, setState]);

    return [state, setState, resetState];
}
