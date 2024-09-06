import React, { ComponentType, FC, ReactNode } from 'react';

interface ChildWithProps<C = {}> {
	Child: ComponentType<C>;
	childProps?: C;
}

interface Provider<P = {}, C = {}> {
	provider: FC<P>;
	props?: P;
	childrenWithProps?: ChildWithProps[];
}

export const combineProviders = (providers: Provider<any, any>[]) => {
	return ({ children }: { children: ReactNode }) => {
		return providers.reduceRight(
			(acc, { provider: ProviderComponent, props, childrenWithProps }) => {
				return (
					<ProviderComponent {...props}>
						{acc}
						{childrenWithProps?.map(({ Child, childProps }, index) => (
							<Child key={index} {...childProps} />
						))}
					</ProviderComponent>
				);
			},
			children,
		);
	};
};
