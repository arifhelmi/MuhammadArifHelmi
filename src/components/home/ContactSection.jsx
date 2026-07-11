import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faArrowUpRightFromSquare,
	faCheck,
	faCopy,
	faEnvelope,
	faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import Reveal from "../common/Reveal";
import INFO from "../../data/user";

const ContactSection = () => {
	const [copied, setCopied] = useState(false);
	const links = [
		{ label: "GitHub", detail: "Code & repositories", href: INFO.socials.github, icon: faGithub },
		{ label: "LinkedIn", detail: "Professional profile", href: INFO.socials.linkedin, icon: faLinkedinIn },
		{ label: "Resume", detail: "Download CV", href: INFO.socials.cv, icon: faFileLines },
	];

	const copyEmail = async () => {
		if (!navigator.clipboard) {
			window.location.href = `mailto:${INFO.main.email}`;
			return;
		}

		await navigator.clipboard.writeText(INFO.main.email);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1800);
	};

	return (
		<section className="portfolio-contact-band" id="contact">
			<Reveal className="portfolio-contact portfolio-shell">
				<div className="portfolio-contact-copy">
					<p className="portfolio-eyebrow">05 / Contact</p>
					<h2>Let&apos;s build something reliable.</h2>
					<p>
						Have a product idea, backend challenge, or engineering team that needs momentum? Share the context and I will get back to you.
					</p>
				</div>

				<div className="portfolio-contact-actions">
					<a className="portfolio-button portfolio-button-primary" href={`mailto:${INFO.main.email}`}>
						<FontAwesomeIcon icon={faEnvelope} />
						Start a conversation
						<FontAwesomeIcon icon={faArrowRight} />
					</a>
					<button className="portfolio-button portfolio-button-secondary" onClick={copyEmail} type="button">
						<FontAwesomeIcon icon={copied ? faCheck : faCopy} />
						{copied ? "Email copied" : "Copy email"}
					</button>
				</div>

				<div className="portfolio-contact-links">
					<a className="portfolio-contact-link" href={`mailto:${INFO.main.email}`}>
						<span className="portfolio-contact-link-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
						<span><small>Email</small><strong>{INFO.main.email}</strong></span>
						<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
					</a>
					{links.map((link) => (
						<a className="portfolio-contact-link" href={link.href} key={link.label} target="_blank" rel="noreferrer">
							<span className="portfolio-contact-link-icon"><FontAwesomeIcon icon={link.icon} /></span>
							<span><small>{link.label}</small><strong>{link.detail}</strong></span>
							<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
						</a>
					))}
				</div>
			</Reveal>
		</section>
	);
};

export default ContactSection;
