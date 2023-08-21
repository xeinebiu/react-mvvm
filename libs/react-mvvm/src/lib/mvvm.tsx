import React, { useContext, useMemo } from 'react';

type ViewModelProviders<Type> = {
    [Property in keyof Type]: Type[Property];
};

const MvvmContext = React.createContext<
    ViewModelProviders<unknown> | undefined
>(undefined);

export function MvvmProvider<T>({
    viewModels,
    children,
}: {
    viewModels: ViewModelProviders<T>;
    children: React.ReactNode;
}): JSX.Element {
    return (
        <MvvmContext.Provider value={viewModels}>
            {children}
        </MvvmContext.Provider>
    );
}

export function useViewModel<VM>(): ViewModelProviders<VM> {
    return useContext(MvvmContext) as ViewModelProviders<VM>;
}

export function useMvvm<VM>(viewModels: VM): ViewModelProviders<VM> {
    return useMemo<ViewModelProviders<VM>>(() => {
        const newViewModels = {};

        for (const key in viewModels) {
            const newKey = `${key}`;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            newViewModels[newKey] = viewModels[key];
        }

        return newViewModels as ViewModelProviders<VM>;
    }, [viewModels]);
}
