import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowDown,
	faArrowRight,
	faEnvelope,
	faFileLines,
} from "@fortawesome/free-solid-svg-icons";

import Reveal from "../common/Reveal";
import INFO from "../../data/user";

const HeroSection = () => {
	const capabilities = [
		"ASP.NET MVC & C#",
		"Laravel & MySQL",
		"React.js & UI Delivery",
		"SQL Server & Workflow Systems",
	];

	return (
		<React.Fragment>
			<section className="portfolio-hero portfolio-shell" id="home">
				<div className="portfolio-hero-layout">
				<Reveal className="portfolio-hero-copy">
					<div className="portfolio-availability">
						<span aria-hidden="true" />
						{INFO.homepage.eyebrow}
					</div>

					<h1 id="portfolio-title">{INFO.homepage.name}</h1>
					<p className="portfolio-hero-role">
						{INFO.homepage.title}
						<span>Enterprise software, e-commerce, and product delivery.</span>
					</p>
					<p className="portfolio-hero-description">
						{INFO.homepage.description}
					</p>

					<div className="portfolio-hero-actions">
						<a className="portfolio-button portfolio-button-primary" href="#projects">
							{INFO.homepage.cta}
							<FontAwesomeIcon icon={faArrowRight} />
						</a>
						<a className="portfolio-button portfolio-button-secondary" href="#contact">
							<FontAwesomeIcon icon={faEnvelope} />
							{INFO.homepage.secondaryCta}
						</a>
						<a
							className="portfolio-button portfolio-button-quiet"
							href={INFO.socials.cv}
							target="_blank"
							rel="noreferrer"
						>
							<FontAwesomeIcon icon={faFileLines} />
							Download CV
						</a>
					</div>
				</Reveal>

				<Reveal className="portfolio-terminal-wrap" delay={140}>
					<div className="portfolio-terminal" aria-label="Developer profile summary">
						<div className="portfolio-terminal-bar">
							<div className="portfolio-terminal-dots" aria-hidden="true">
								<span />
								<span />
								<span />
							</div>
							<span>profile.ts</span>
							<span className="portfolio-terminal-state">READY</span>
						</div>
						<div className="portfolio-terminal-body">
							<p><span className="terminal-muted">01</span><span className="terminal-key">const</span> developer = {"{"}</p>
							<p><span className="terminal-muted">02</span>&nbsp;&nbsp;focus: <span className="terminal-string">"enterprise workflows"</span>,</p>
							<p><span className="terminal-muted">03</span>&nbsp;&nbsp;stack: [<span className="terminal-string">"ASP.NET MVC"</span>, <span className="terminal-string">"Laravel"</span>, <span className="terminal-string">"React.js"</span>],</p>
							<p><span className="terminal-muted">04</span>&nbsp;&nbsp;delivery: <span className="terminal-string">"regression-aware"</span>,</p>
							<p><span className="terminal-muted">05</span>&nbsp;&nbsp;location: <span className="terminal-string">"Jakarta / Remote"</span>,</p>
							<p><span className="terminal-muted">06</span>&nbsp;&nbsp;available: <span className="terminal-boolean">true</span></p>
							<p><span className="terminal-muted">07</span>{"}"};</p>
							<p className="terminal-output"><span className="terminal-prompt">$</span> ready_to_build<span className="terminal-cursor" aria-hidden="true" /></p>
						</div>
					</div>

					<div className="portfolio-terminal-meta">
						<span>Procurement systems</span>
						<span>Marketplace ops</span>
						<span>Production support</span>
					</div>
				</Reveal>
				</div>
			</section>

			<Reveal as="section" className="portfolio-capability-bar portfolio-shell" delay={220}>
				<p className="portfolio-capability-label">
					<span>Core profile</span>
					<FontAwesomeIcon icon={faArrowDown} />
				</p>
				<ul>
					{capabilities.map((capability, index) => (
						<li key={capability}>
							<span>{String(index + 1).padStart(2, "0")}</span>
							{capability}
						</li>
					))}
				</ul>
			</Reveal>
		</React.Fragment>
	);
};

export default HeroSection;
