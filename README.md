
# Stacked React Providers

A lightweight utility to combine and stack multiple React context providers into a single component for better state management and clean application architecture.

![Stacked React Providers Demo](https://i.imgur.com/xKXtsK8.gif)

## Features

- Combine multiple React providers into one.
- Supports both custom and third-party providers.
- Keeps your component tree clean and organized.

## Installation

Install via npm:

```bash
npm install stacked-react-providers
```

Or via Yarn:

```bash
yarn add stacked-react-providers
```

## Before using this package

If you're dealing with multiple providers in your React app, you might be wrapping components deeply inside each provider. Your component tree could look like this:

```tsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider>
          <YourComponent />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

While this works, it becomes harder to maintain and adds unnecessary nesting.

## Basic Usage

Here’s a simple example demonstrating how to use the `stacked-react-providers` package to combine multiple providers.

```tsx
import React from 'react';
import { stackProviders } from 'stacked-react-providers';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './queryClient';

// Combine your providers into one
const StackedProviders = stackProviders([
  { provider: AuthProvider, props: { authToken: 'my-auth-token' } },
  { provider: ThemeProvider, props: { theme: 'dark' } },
  {
    provider: QueryClientProvider,
    props: { client: queryClient },
    childrenWithProps: [
      { Child: ReactQueryDevtools, childProps: { initialIsOpen: false } },
    ],
  },
]);

function App() {
  return (
    <StackedProviders>
      <YourComponent />
    </StackedProviders>
  );
}

export default App;
```

## After using this package

With `stacked-react-providers`, your app becomes much cleaner and easier to maintain:

```tsx
function App() {
  return (
    <StackedProviders>
      <YourComponent />
    </StackedProviders>
  );
}
```

### API

#### `stackProviders(providers: Provider[])`

This function accepts an array of provider objects and returns a single component that combines them.

- **Parameters**:

  - `providers`: An array of provider objects, where each object can include:
    - `provider`: The React provider component.
    - `props`: (Optional) Props for the provider component.
    - `childrenWithProps`: (Optional) An array of child components that need to be rendered in current provider.
    -- `Child`: The Child Component.
    -- `childProps`: (Optional) the props for child component.

- **Returns**:
  - A React component that combines the provided providers.

#### Example:

```tsx
const StackedProviders = stackProviders([
  { provider: SomeProvider, props: { someProp: 'value' } },
  { provider: AnotherProvider, childrenWithProps: [{Child: SomeComponent, childProps:{someProp: 'value'}}] },
]);
```

## License

This package is open-source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any bugs or have suggestions for improvement.
