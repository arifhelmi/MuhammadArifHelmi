import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUpRightFromSquare,
	faLock,
	faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";

import SkillBadge from "./SkillBadge";

const ProjectCard = ({ project, index, featured = false }) => {
	return (
		<article className={`portfolio-project-card${featured ? " is-featured" : ""}`}>
			<div className="portfolio-project-visual" aria-hidden="true">
				<div className="portfolio-project-visual-top">
					<span>PROJECT / {String(index + 1).padStart(2, "0")}</span>
					<FontAwesomeIcon icon={faWaveSquare} />
				</div>
				<div className="portfolio-project-mark">{project.initial}</div>
				<div className="portfolio-project-lines">
					<span />
					<span />
					<span />
				</div>
			</div>

			<div className="portfolio-project-body">
				<p className="portfolio-project-category">{project.category}</p>
				<h3>{project.title}</h3>
				<p className="portfolio-project-description">{project.description}</p>

				<ul className="portfolio-project-features">
					{project.features.map((feature) => (
						<li key={feature}>{feature}</li>
					))}
				</ul>

				<div className="portfolio-skill-list" aria-label="Technology stack">
					{project.stack.map((item) => (
						<SkillBadge key={item}>{item}</SkillBadge>
					))}
				</div>

				{project.link ? (
					<a
						className="portfolio-project-link"
						href={project.link}
						target="_blank"
						rel="noreferrer"
					>
						Visit live product
						<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
					</a>
				) : (
					<span className="portfolio-project-link is-private">
						Private product
						<FontAwesomeIcon icon={faLock} />
					</span>
				)}
			</div>
		</article>
	);
};

export default ProjectCard;
