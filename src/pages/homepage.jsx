import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faEnvelope,
	faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import Reveal from "../components/common/Reveal";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";

const Homepage = () => {
	const currentSEO = SEO.find((item) => item.page === "home");
	const socialLinks = [
		{
			href: INFO.socials.github,
			icon: faGithub,
			label: "GitHub",
		},
		{
			href: INFO.socials.linkedin,
			icon: faLinkedinIn,
			label: "LinkedIn",
		},
		{
			href: INFO.socials.cv,
			icon: faFileLines,
			label: "Resume",
		},
		{
			href: `mailto:${INFO.main.email}`,
			icon: faEnvelope,
			label: "Email",
		},
	];

	return (
		<React.Fragment>
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content home-page">
				<NavBar active="home" />
				<main className="content-wrapper homepage-wrapper">
					<section className="homepage-hero">
						<Reveal className="homepage-hero-copy">
							<div className="eyebrow">{INFO.homepage.eyebrow}</div>
							<h1 className="title homepage-title">
								{INFO.homepage.title}
							</h1>

							<p className="subtitle homepage-subtitle">
								{INFO.homepage.description}
							</p>

							<div className="hero-actions">
								<Link className="primary-action" to="/projects">
									{INFO.homepage.cta}
									<FontAwesomeIcon icon={faArrowRight} />
								</Link>
								<Link className="secondary-action" to="/contact">
									{INFO.homepage.secondaryCta}
								</Link>
							</div>

							<div className="homepage-socials" aria-label="Social links">
								{socialLinks.map((item) => (
									<a
										aria-label={item.label}
										className="icon-action"
										href={item.href}
										key={item.label}
										rel="noreferrer"
										target="_blank"
										title={item.label}
									>
										<FontAwesomeIcon icon={item.icon} />
									</a>
								))}
							</div>
						</Reveal>

						<Reveal className="homepage-visual" delay={120}>
							<div className="homepage-image-wrapper">
								<img
									src="homepage.jpg"
									alt="Muhammad Arif Helmi with a mountain landscape"
									className="homepage-image"
								/>
							</div>
							<div className="homepage-visual-note">
								<span>Current focus</span>
								<strong>Scalable backend services for mobile products.</strong>
							</div>
						</Reveal>
					</section>

					<Reveal
						as="section"
						className="homepage-highlights"
						delay={180}
					>
						{INFO.highlights.map((highlight) => (
							<div className="highlight-item" key={highlight.label}>
								<strong>{highlight.value}</strong>
								<span>{highlight.label}</span>
							</div>
						))}
					</Reveal>

					<Reveal as="section" className="homepage-skills" delay={120}>
						<div className="section-heading">
							<div className="section-kicker">Core strengths</div>
							<h2 className="section-title">Built for product teams.</h2>
							<p className="section-description">
								I combine backend discipline with enough frontend sense to keep
								features clear, fast, and practical.
							</p>
						</div>

						<div className="skill-grid">
							{INFO.skills.map((skill) => (
								<article className="skill-card" key={skill.title}>
									<h3>{skill.title}</h3>
									<div className="chip-list">
										{skill.items.map((item) => (
											<span className="chip" key={item}>
												{item}
											</span>
										))}
									</div>
								</article>
							))}
						</div>
					</Reveal>

					<Reveal as="section" className="homepage-projects" delay={120}>
						<div className="section-heading">
							<div className="section-kicker">Selected work</div>
							<h2 className="section-title">Projects with real product shape.</h2>
						</div>

						<AllProjects />
					</Reveal>

					<div className="page-footer">
						<Footer />
					</div>
				</main>
			</div>
		</React.Fragment>
	);
};

export default Homepage;
