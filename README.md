## View Models and Separating Business Logic from UI

In software development, a view model is an architectural pattern that separates the presentation layer (UI) from the business logic layer.


## Getting Started

### Installation
````shell
npm i @xeinebiu/react-mvvm@2.0.7
````

### Creating a ViewModel

To create a new view model, extend the `ViewModel` class provided by this library:

```typescript
import { createViewModel } from '@xeinebiu/react-mvvm';

const counterViewModel = createViewModel({ counter: 0 }, viewModel => ({
    increment: () =>
        viewModel.setState({ counter: viewModel.getState().counter + 1 }),
    decrement: () =>
        viewModel.setState({ counter: viewModel.getState().counter - 1 }),
}));
```

### Using useSelector Hook

The `useSelector` hook allows you to subscribe to changes in the view model state and efficiently update your components:

```tsx
import { useSelector } from '@xeinebiu/react-mvvm';

function CounterComponent() {
    const count = useSelector(counterViewModel, vm => vm.getState().count);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={counterViewModel.increment}>Increment</button>
            <button onClick={counterViewModel.decrement}>Decrement</button>
        </div>
    );
}
```

In this example, the `CounterComponent` will automatically re-render whenever the `count` state in the `CounterViewModel` changes.

## API

### ViewModel

| Method                                         | Description                                                                                                               |
|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `constructor(initialState: T)`                 | Creates a new instance of ViewModel with the provided initial state.                                                      |
| `getState(): T`                                | Returns the current state of the ViewModel.                                                                               |
| `setState(newState: Partial<T>): void`         | Updates the state of the ViewModel with the provided partial state object.                                                |
| `subscribe(listener: Listener<T>): () => void` | Subscribes a listener function to be called whenever the state of the ViewModel changes. Returns an unsubscribe function. |
| `dispose(): void`                              | Clears all listeners and disposes of the ViewModel.                                                                       |

### useSelector

#### `(viewModel: T, selector: (viewModel: T) => S): S`

A hook that subscribes to changes in the ViewModel's state and efficiently updates the component when the selected state changes.

## License

This library is licensed under the MIT License.
