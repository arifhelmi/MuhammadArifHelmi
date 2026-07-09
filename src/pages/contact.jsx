import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUpRightFromSquare,
	faCheck,
	faEnvelope,
	faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import Reveal from "../components/common/Reveal";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/contact.css";

const Contact = () => {
	const currentSEO = SEO.find((item) => item.page === "contact");
	const [copied, setCopied] = useState(false);
	const contactItems = [
		{
			href: `mailto:${INFO.main.email}`,
			icon: faEnvelope,
			label: "Email",
			text: INFO.main.email,
		},
		{
			href: INFO.socials.linkedin,
			icon: faLinkedin,
			label: "LinkedIn",
			text: "Professional updates",
		},
		{
			href: INFO.socials.github,
			icon: faGithub,
			label: "GitHub",
			text: "Code and repositories",
		},
		{
			href: INFO.socials.cv,
			icon: faFileLines,
			label: "Resume",
			text: "Download my CV",
		},
	];

	const copyEmail = async () => {
		await navigator.clipboard.writeText(INFO.main.email);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1800);
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="contact" />
				<main className="content-wrapper contact-container">
					<Reveal as="section" className="contact-hero">
						<div className="eyebrow">Contact</div>
						<h1 className="title contact-title">
							Have a product, backend challenge, or team that needs momentum?
						</h1>

						<p className="subtitle contact-subtitle">
							Send me the context, goals, and timeline. I am happy to talk
							through backend architecture, product delivery, or collaboration
							opportunities.
						</p>

						<div className="contact-actions">
							<a
								className="primary-action"
								href={`mailto:${INFO.main.email}`}
							>
								Send Email
								<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
							</a>
							<button
								className="secondary-action copy-button"
								onClick={copyEmail}
								type="button"
							>
								{copied ? "Email Copied" : "Copy Email"}
								{copied ? <FontAwesomeIcon icon={faCheck} /> : null}
							</button>
						</div>
					</Reveal>

					<Reveal as="section" className="contact-grid" delay={140}>
						{contactItems.map((item) => (
							<a
								className="contact-card"
								href={item.href}
								key={item.label}
								target="_blank"
								rel="noreferrer"
							>
								<span className="contact-card-icon">
									<FontAwesomeIcon icon={item.icon} />
								</span>
								<span>
									<strong>{item.label}</strong>
									<small>{item.text}</small>
								</span>
								<FontAwesomeIcon
									className="contact-card-arrow"
									icon={faArrowUpRightFromSquare}
								/>
							</a>
						))}
					</Reveal>

					<div className="page-footer">
						<Footer />
					</div>
				</main>
			</div>
		</React.Fragment>
	);
};

export default Contact;
