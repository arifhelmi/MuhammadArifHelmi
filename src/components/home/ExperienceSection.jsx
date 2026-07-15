import React from "react";

import Reveal from "../common/Reveal";
import INFO from "../../data/user";
import ExperienceCard from "./ExperienceCard";
import SectionHeading from "./SectionHeading";

const ExperienceSection = () => {
	return (
		<section className="portfolio-experience-band" id="experience">
			<div className="portfolio-section portfolio-shell">
				<Reveal>
					<SectionHeading
						eyebrow="02 / Experience"
						title="Experience shaped by enterprise delivery."
						description="Selected roles across procurement systems, AI annotation, attendance tools, and application development. The focus stays consistent: reliable workflows, stable releases, and software that can survive production use."
					/>
				</Reveal>

				<div className="portfolio-experience-list">
					{INFO.experience.map((experience, index) => (
						<Reveal key={experience.project} delay={index * 70}>
							<ExperienceCard experience={experience} index={index} />
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
};

export default ExperienceSection;
