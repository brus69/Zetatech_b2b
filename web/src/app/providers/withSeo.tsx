import { NextSeo } from "next-seo";
import { ComponentType } from "react";

export const withSeo =
	<T extends object>(Component: ComponentType<T>) =>
	// eslint-disable-next-line react/display-name
	(props: T) => (
		<>
			<NextSeo
				title="Аренда вещей: наслаждайтесь комфортом без лишних затрат - ВПРОКАТ"
				description="Сервис по аренде вещей предлагает широкий ассортимент аренды одежды, аксессуаров и оборудования для различных мероприятий. Найдите идеальный предмет для вашего повседневного использования или специального события."
				openGraph={{
					title:
						"Аренда вещей - найдите идеальный предмет для вашего повседневного использования или специального события",
					description:
						"Сервис по аренде вещей предлагает широкий ассортимент аренды одежды, аксессуаров и оборудования для различных мероприятий. Найдите идеальный предмет для вашего повседневного использования или специального события.",
					type: "website",
					locale: "ru_RU",
					siteName: "Сервис по аренде вещей",
				}}
				additionalMetaTags={[
					{
						name: "keywords",
						content: "аренда вещей, прокат, аренда одежды, аренда оборудования, аренда аксессуаров",
					},
					{
						name: "viewport",
						content: "width=device-width,initial-scale=1",
					},
					{
						name: "apple-mobile-web-app-capable",
						content: "yes",
					},
				]}
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
