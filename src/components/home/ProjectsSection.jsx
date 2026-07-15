import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Reveal from "../common/Reveal";
import INFO from "../../data/user";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

const ProjectsSection = ({ showAllLink = true }) => {
	return (
		<section className="portfolio-section portfolio-projects portfolio-shell" id="projects">
			<Reveal className="portfolio-projects-heading">
				<SectionHeading
					eyebrow="03 / Projects"
					title="Projects built around real business needs."
					description="A selection of enterprise systems, commerce platforms, and product websites presented around the problem, implementation, and result behind each build."
				/>
				{showAllLink ? (
					<Link className="portfolio-text-link" to="/projects">
						View all projects
						<FontAwesomeIcon icon={faArrowRight} />
					</Link>
				) : null}
			</Reveal>

			<div className="portfolio-project-grid">
				{INFO.projects.map((project, index) => (
					<Reveal key={project.title} delay={(index % 2) * 80}>
						<ProjectCard project={project} index={index} featured={index === 0} />
					</Reveal>
				))}
			</div>
		</section>
	);
};

export default ProjectsSection;
