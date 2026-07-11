import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import SkillBadge from "./SkillBadge";

const ExperienceCard = ({ experience, index }) => {
	return (
		<article className="portfolio-experience-card">
			<div className="portfolio-experience-index" aria-hidden="true">
				<span>{String(index + 1).padStart(2, "0")}</span>
			</div>
			<div className="portfolio-experience-content">
				<div className="portfolio-experience-header">
					<div>
						<p>{experience.role}</p>
						<h3>{experience.project}</h3>
					</div>
					<span className="portfolio-experience-location">
						<FontAwesomeIcon icon={faLocationDot} />
						{experience.location}
					</span>
				</div>

				<p className="portfolio-experience-description">{experience.description}</p>
				<p className="portfolio-experience-impact">
					<FontAwesomeIcon icon={faArrowRightLong} />
					{experience.impact}
				</p>

				<div className="portfolio-skill-list" aria-label="Technology stack">
					{experience.stack.map((item) => (
						<SkillBadge key={item}>{item}</SkillBadge>
					))}
				</div>
			</div>
		</article>
	);
};

export default ExperienceCard;
