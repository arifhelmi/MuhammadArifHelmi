import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCode,
	faDatabase,
	faLayerGroup,
	faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

import Reveal from "../common/Reveal";
import INFO from "../../data/user";
import SectionHeading from "./SectionHeading";

const AboutSection = () => {
	const factIcons = [faCode, faLayerGroup, faDatabase, faPeopleGroup];

	return (
		<section className="portfolio-section portfolio-about portfolio-shell" id="about">
			<Reveal>
				<SectionHeading
					eyebrow="01 / About"
					title={INFO.about.title}
					description="A full stack perspective shaped by procurement systems, attendance tools, e-commerce flows, and production support."
				/>
			</Reveal>

			<div className="portfolio-about-layout">
				<Reveal className="portfolio-about-copy" delay={100}>
					<p>{INFO.about.description}</p>
					<p>{INFO.about.secondary}</p>

					<div className="portfolio-principles">
						<p>How I approach the work</p>
						<ol>
							{INFO.principles.map((principle) => (
								<li key={principle}>{principle}</li>
							))}
						</ol>
					</div>
				</Reveal>

				<Reveal as="aside" className="portfolio-facts" delay={160}>
					<div className="portfolio-facts-header">
						<span>Working profile</span>
						<span className="portfolio-facts-status">ACTIVE</span>
					</div>
					<div className="portfolio-facts-list">
						{INFO.quickFacts.map((fact, index) => (
							<div className="portfolio-fact" key={fact.label}>
								<span className="portfolio-fact-icon" aria-hidden="true">
									<FontAwesomeIcon icon={factIcons[index]} />
								</span>
								<span>
									<small>{fact.label}</small>
									<strong>{fact.value}</strong>
								</span>
							</div>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	);
};

export default AboutSection;
