import { delay } from '../util';

export async function LoadVmDescription(): Promise<string> {
    // simulate data loading
    await delay(5000);

    return `
In software development, a view model is an architectural pattern that separates the presentation layer (UI) from the business logic layer. The view model is responsible for preparing and managing data for the UI, while the business logic layer handles the underlying business logic of the application.

One of the main advantages of using a view model is that it helps to reduce the complexity of the UI layer. By separating the UI layer from the business logic layer, developers can create a more modular and maintainable codebase. This makes it easier to update and modify the application over time, as changes to one layer do not necessarily require changes to the other layer.

Another benefit of using a view model is that it can improve the testability of the application. Because the view model is separate from the UI layer, it can be easily unit tested without the need for UI automation testing. This can help to catch bugs and issues earlier in the development process and improve the overall quality of the application.

In summary, using view models can help to:
    Separate the presentation layer (UI) from the business logic layer
    Reduce complexity and improve maintainability of the codebase
    Improve the testability of the application.
    `;
}
