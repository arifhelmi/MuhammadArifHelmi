import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/common/navBar";
import Reveal from "../components/common/Reveal";

import INFO from "../data/user";

import "./styles/404.css";

const Notfound = () => {
	useEffect(() => {
		document.title = `404 | ${INFO.main.title}`;
	}, []);

	return (
		<React.Fragment>
			<div className="not-found page-content">
				<NavBar />
				<main className="content-wrapper notfound-container">
					<Reveal className="notfound-message">
						<div className="notfound-kicker">404</div>
						<h1 className="notfound-title">Page not found</h1>
						<p className="not-found-message">
							The page "{window.location.pathname}" is not available.
						</p>
						<Link to="/" className="primary-action">
							Go back home
						</Link>
					</Reveal>
				</main>
			</div>
		</React.Fragment>
	);
};

export default Notfound;
