import React from "react";

import Reveal from "../common/Reveal";
import INFO from "../../data/user";
import SectionHeading from "./SectionHeading";
import SkillBadge from "./SkillBadge";

const SkillsSection = () => {
	return (
		<section className="portfolio-skills-band" id="skills">
			<div className="portfolio-section portfolio-shell">
				<Reveal>
					<SectionHeading
						eyebrow="04 / Skills"
						title="A practical stack for dependable delivery."
						description="Tools are selected for maintainability, team clarity, and production needs rather than novelty."
					/>
				</Reveal>

				<div className="portfolio-skills-grid">
					{INFO.skills.map((skill, index) => (
						<Reveal as="article" className="portfolio-skill-category" key={skill.title} delay={(index % 3) * 60}>
							<div className="portfolio-skill-category-heading">
								<span>{skill.code}</span>
								<h3>{skill.title}</h3>
								<small>{String(index + 1).padStart(2, "0")}</small>
							</div>
							<div className="portfolio-skill-list">
								{skill.items.map((item) => (
									<SkillBadge key={item}>{item}</SkillBadge>
								))}
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
};

export default SkillsSection;
