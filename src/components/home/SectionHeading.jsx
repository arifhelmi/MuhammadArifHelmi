import React from "react";

const SectionHeading = ({ eyebrow, title, description, compact = false }) => {
	return (
		<header
			className={`portfolio-section-heading${compact ? " is-compact" : ""}`}
		>
			<p className="portfolio-eyebrow">{eyebrow}</p>
			<h2>{title}</h2>
			{description ? <p className="portfolio-section-copy">{description}</p> : null}
		</header>
	);
};

export default SectionHeading;
