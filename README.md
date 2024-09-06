# stacked-react-providers

`stacked-react-providers` is a utility that allows you to combine multiple React providers in a clean and efficient way, with support for rendering child components with specific props.

## Features

- Combine multiple React providers into a single component.
- Support for rendering multiple child components inside providers, with individual props for each child.
- Easy to integrate with both custom and third-party providers.

## Installation

You can install `stacked-react-providers` via npm or yarn:

### NPM

```bash
npm install stacked-react-providers
```

### Yarn

```bash
yarn add stacked-react-providers
```

## Usage

Here’s an example of how to use `stacked-react-providers` to combine multiple React providers into a single component:

```tsx
import React from 'react';
import { stackProviders } from 'stacked-react-providers';
import { TooltipProvider } from './TooltipProvider';
import { ReactQueryProvider } from '@tanstack/react-query';
import { StoreProvider } from './StoreProvider';
import { SocketProvider } from './SocketProvider';
import { ToastWrapper } from './ToastWrapper';

// Example child component
interface ToasterProps {
	position: string;
}

const ToasterContainer: React.FC<ToasterProps> = ({ position }) => {
	return <div>Toaster Position: {position}</div>;
};

// Another example child component
const AnotherChildComponent: React.FC = () => {
	return <div>Another child inside a provider</div>;
};

// Third-party QueryClientProvider (from Tanstack Query)
const queryClient = new QueryClient();

// Combining multiple providers
const StackedProviders = stackProviders([
	{
		provider: TooltipProvider,
		props: { delayDuration: 200 },
		childrenWithProps: [
			{ Child: ToasterContainer, childProps: { position: 'bottom-right' } },
			{ Child: AnotherChildComponent }, // No props for this child
		],
	},
	{ provider: ReactQueryProvider },
	{ provider: StoreProvider },
	{ provider: SocketProvider },
	{ provider: QueryClientProvider, props: { client: queryClient } }, // Third-party provider
]);

function App({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="poppins-className">
			<body>
				<StackedProviders>
					{children} {/* Children passed to the SocketProvider */}
					<ToastWrapper />{' '}
					{/* ToastWrapper remains outside of SocketProvider */}
				</StackedProviders>
			</body>
		</html>
	);
}

export default App;
```

## API

### `stackProviders(providers: Provider[])`

Combines multiple providers and returns a single component that wraps its children in the specified providers. Supports passing props to providers and rendering children inside providers.

#### Parameters

- `providers`: An array of provider objects. Each object can include:
  - `provider`: The React provider component.
  - `props` (optional): Props for the provider component.
  - `childrenWithProps` (optional): An array of child components to be rendered inside the provider, along with their respective props.

#### Example:

```tsx
const StackedProviders = stackProviders([
	{ provider: SomeProvider, props: { someProp: 'value' } },
	{
		provider: AnotherProvider,
		childrenWithProps: [
			{ Child: SomeComponent, childProps: { someChildProp: 'value' } },
		],
	},
]);
```

## License

This package is open-source and available under the [MIT License](LICENSE).
