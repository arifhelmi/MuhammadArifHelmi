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
						title="Product experience shaped by real delivery."
						description="Selected work across social, commerce, content, and community products. The focus stays consistent: clear backend contracts, dependable data flows, and software that can move into production."
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
