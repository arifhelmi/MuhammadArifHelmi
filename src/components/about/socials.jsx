import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUpRightFromSquare,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

import INFO from "../../data/user";

import "./styles/socials.css";

const Socials = () => {
	const items = [
		{
			href: INFO.socials.github,
			icon: faGithub,
			label: "GitHub",
			text: "Explore my code",
		},
		{
			href: INFO.socials.linkedin,
			icon: faLinkedin,
			label: "LinkedIn",
			text: "Connect professionally",
		},
		{
			href: INFO.socials.cv,
			icon: faFileLines,
			label: "CV",
			text: "Download resume",
		},
		{
			href: `mailto:${INFO.main.email}`,
			icon: faEnvelope,
			label: "Email",
			text: INFO.main.email,
		},
	];

	return (
		<div className="socials">
			{items.map((item) => (
				<a
					className="social"
					href={item.href}
					key={item.label}
					target="_blank"
					rel="noreferrer"
				>
					<span className="social-icon">
						<FontAwesomeIcon icon={item.icon} />
					</span>
					<span className="social-copy">
						<span className="social-label">{item.label}</span>
						<span className="social-text">{item.text}</span>
					</span>
					<span className="social-arrow">
						<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
					</span>
				</a>
			))}
		</div>
	);
};

export default Socials;
