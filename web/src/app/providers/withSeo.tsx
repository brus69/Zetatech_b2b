import { NextSeo } from "next-seo";
import { ComponentType } from "react";

export const withSeo =
	<T extends object>(Component: ComponentType<T>) =>
	// eslint-disable-next-line react/display-name
	(props: T) => (
		<>
			<NextSeo
				additionalLinkTags={[
					{
						rel: "icon",
						href: "/favicon.ico",
					},
				]}
			/>
			<Component {...props} />
		</>
	);
