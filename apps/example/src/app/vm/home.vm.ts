import { useEffect, useState } from 'react';
import { LoadVmDescription } from '../data';

export type HomeViewModel = Readonly<{
    viewModelDescription: string;
    loading: boolean;
}>;

export function HomeViewModelImpl(): HomeViewModel {
    const [vmDescription, setVmDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        LoadVmDescription()
            .then(setVmDescription)
            .then(() => setLoading(false));
    }, []);

    return {
        viewModelDescription: vmDescription,
        loading: loading,
    };
}
