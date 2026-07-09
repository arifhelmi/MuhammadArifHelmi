import React from "react";
import { Link } from "react-router-dom";

import "./styles/navBar.css";

const NavBar = (props) => {
	const { active } = props;
	const links = [
		{ label: "Home", to: "/", key: "home" },
		{ label: "About", to: "/about", key: "about" },
		{ label: "Projects", to: "/projects", key: "projects" },
		{ label: "Contact", to: "/contact", key: "contact" },
	];

	return (
		<React.Fragment>
			<div className="nav-container">
				<nav className="navbar" aria-label="Main navigation">
					<div className="nav-background">
						<ul className="nav-list">
							{links.map((link) => (
								<li
									className={
										active === link.key
											? "nav-item active"
											: "nav-item"
									}
									key={link.key}
								>
									<Link
										aria-current={
											active === link.key ? "page" : undefined
										}
										to={link.to}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</nav>
			</div>
		</React.Fragment>
	);
};

export default NavBar;
