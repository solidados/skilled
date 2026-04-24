import { Link } from "@tanstack/react-router";
import { Show, UserButton } from '@clerk/tanstack-react-start';
import { LogIn } from "lucide-react";

const NavBar = () => (
	<nav className="navbar">
		<div className="brand">
			<div className="mark">
				<div className="glyph" />
			</div>
			<Link to="/">
				<span>Skild</span>
			</Link>
		</div>

		<div className="actions">
			<Show when="signed-in">
				<UserButton />
			</Show>
			
			<Show when="signed-out">
				<Link to="/sign-in/$" className="btn-primary">
					<LogIn size={16} />
					Sign in
				</Link>
			</Show>
		</div>
	</nav>
);

export default NavBar;
