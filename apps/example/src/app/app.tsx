import { createViewModel, useSelector } from '@xeinebiu/react-mvvm';
import React from 'react';

const counterViewModel = createViewModel({ counter: 0 }, viewModel => ({
    increment: () =>
        viewModel.setState({ counter: viewModel.getState().counter + 1 }),
    decrement: () =>
        viewModel.setState({ counter: viewModel.getState().counter - 1 }),
}));

function CounterComponent() {
    const count = useSelector(counterViewModel, vm => vm.getState().counter);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={counterViewModel.increment}>Increment</button>
            <button onClick={counterViewModel.decrement}>Decrement</button>
        </div>
    );
}

export function App() {
    return <CounterComponent />;
}

export default App;
