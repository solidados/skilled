import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/__auth/sign-in/$")({
	component: RouteComponent,
});

/**
 * Renders the sign-in page section containing Clerk's SignIn UI configured for path-based routing.
 *
 * The rendered SignIn component is set to use the "/sign-in" path, links to "/sign-up" for registration,
 * and falls back to "/" for redirect when no destination is available.
 *
 * @returns A React element representing the sign-in section with the Clerk SignIn component.
 */
function RouteComponent() {
	return (
		<section id="sign-in">
			<SignIn
				routing="path"
				path="/sign-in"
				signUpUrl="/sign-up"
				fallbackRedirectUrl="/"
			/>
		</section>
	);
}
