import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import INFO from "../../data/user";

import "./styles/footer.css";

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="footer">
			<div className="footer-identity">
				<span className="footer-mark">MH</span>
				<span>
					<strong>{INFO.main.name}</strong>
					<small>{INFO.main.role}</small>
				</span>
			</div>

			<nav className="footer-links" aria-label="Footer navigation">
				<a href="/#about">About</a>
				<a href="/#experience">Experience</a>
				<a href="/#projects">Projects</a>
				<a href="/#skills">Skills</a>
				<a href="/#contact">Contact</a>
			</nav>

			<div className="footer-socials">
				<a href={INFO.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
					<FontAwesomeIcon icon={faGithub} />
				</a>
				<a href={INFO.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
					<FontAwesomeIcon icon={faLinkedinIn} />
				</a>
				<a href={`mailto:${INFO.main.email}`} aria-label="Email Muhammad Arif Helmi">
					<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
				</a>
			</div>

			<p className="footer-credits">&copy; {year} {INFO.main.name}. All rights reserved.</p>
		</footer>
	);
};

export default Footer;
