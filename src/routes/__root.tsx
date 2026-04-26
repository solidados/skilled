import * as React from "react";
import { useEffect } from "react";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import { ClerkProvider, useUser } from "@clerk/tanstack-react-start";

import posthog from "posthog-js";
import { PostHogProvider, usePostHog } from "@posthog/react";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import CrossHair from "#/components/CrossHair.tsx";
import NavBar from "#/components/NavBar.tsx";

import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

if (typeof window !== "undefined") {
	posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
		api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
		person_profiles: "always",
		capture_pageview: false,
	});
}

/**
 * Synchronizes Clerk authentication state to the PostHog client.
 *
 * When Clerk finishes loading, identifies the user in PostHog using the Clerk user id
 * and the user's email and full name when signed in; otherwise resets the PostHog client.
 *
 * @returns Null — this component does not render any UI.
 */
function PostHogIdentifier() {
	const posthog = usePostHog();
	const { user, isSignedIn, isLoaded } = useUser();

	useEffect(() => {
		if (!isLoaded) return;

		if (isSignedIn && user) {
			posthog.identify(user.id, {
				email: user.primaryEmailAddress?.emailAddress,
				name: user.fullName,
			});
		} else {
			posthog.reset();
		}
	}, [isLoaded, isSignedIn, user?.id]);

	return null;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ title: "Skild - The Registry fro Agentic Intelligence" },
			{
				name: "description",
				content:
					"Discover, publish, and operate reusable agent capabilities from a route-driven workspace.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

/**
 * Renders the root HTML document and application shell, wrapping the app content with analytics, auth, and developer tooling.
 *
 * @param children - Content to render inside the app's main area
 * @returns The root HTML document element containing the app shell and `children`
 */
function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<PostHogProvider client={posthog}>
			<html lang="en" suppressHydrationWarning>
				<head>
					<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
					<HeadContent />
				</head>
				<body className="font-sans antialiased wrap-anywhere">
					<ClerkProvider>
						<PostHogIdentifier />
						<div id="root-layout">
							<header>
								<div className="frame">
									<NavBar />
									<CrossHair />
									<CrossHair />
								</div>
							</header>
							<main>
								<div className="framce">{children}</div>
							</main>
						</div>

						<TanStackDevtools
							config={{
								position: "bottom-right",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
								TanStackQueryDevtools,
							]}
						/>
					</ClerkProvider>
					<Scripts />
				</body>
			</html>
		</PostHogProvider>
	);
}
