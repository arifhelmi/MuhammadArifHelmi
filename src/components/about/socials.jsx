import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
	faGithub,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

import INFO from "../../data/user";

import "./styles/socials.css";

const Socials = () => {
	return (
		<div className="socials">

			<div className="social">
				<a href={INFO.socials.github} target="_blank" rel="noreferrer">
					<div className="social-icon">
						<FontAwesomeIcon
							icon={faGithub}
							className="social-icon"
						/>
					</div>
					<div className="social-text" style={{ color: 'black' }}>Follow on GitHub</div>
				</a>
			</div>

			<div className="social">
				<a
					href={INFO.socials.linkedin}
					target="_blank"
					rel="noreferrer"
				>
					<div className="social-icon">
						<FontAwesomeIcon
							icon={faLinkedin}
							className="social-icon"
						/>
					</div>
					<div className="social-text" style={{ color: 'black' }}>Follow on LinkedIn</div>
				</a>
			</div>

			<div className="social">
				<a
					href={INFO.socials.cv}
					target="_blank"
					rel="noreferrer"
				>
					<div className="social-icon">
						<FontAwesomeIcon
							icon={faFileLines}
							className="social-icon"
						/>
					</div>
					<div className="social-text" style={{ color: 'black' }}>Download my CV</div>
				</a>
			</div>

			<div className="email">
				<div className="email-wrapper">
					<a
						href={`mailto:${INFO.main.email}`}
						target="_blank"
						rel="noreferrer"
					>
						<div className="social-icon">
							<FontAwesomeIcon icon={faEnvelope} />
						</div>

						<div className="social-text" style={{ color: 'black' }}>{INFO.main.email}</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Socials;
