import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/__auth/sign-up/$")({
	component: RouteComponent,
});

/**
 * Renders the sign-up section containing Clerk's SignUp UI configured for path-based routing.
 *
 * @returns The section element that mounts the configured `SignUp` component.
 */
function RouteComponent() {
	return (
		<section id="sign-up">
			<SignUp
				routing="path"
				path="/sign-up"
				signInUrl="/sign-in"
				fallbackRedirectUrl="/"
			/>
		</section>
	);
}
