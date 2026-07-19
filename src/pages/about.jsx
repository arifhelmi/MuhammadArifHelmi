import React from "react";

import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import SeoHead from "../components/common/SeoHead";
import AboutSection from "../components/home/AboutSection";
import SkillsSection from "../components/home/SkillsSection";
import DotField from "../components/interactive/DotField";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/about.css";

const About = () => {
	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<React.Fragment>
			<SeoHead
				description={currentSEO.description}
				keywords={currentSEO.keywords}
				title={`About | ${INFO.main.title}`}
			/>

			<div className="page-content home-page about-page">
				<div className="about-dot-field" aria-hidden="true">
					<DotField
						cursorForce={0.02}
						cursorRadius={1000}
						dotRadius={1}
						dotSpacing={19}
						glowColor="#000000"
						glowRadius={50}
						gradientFrom="#94a3b8"
						gradientTo="#94a3b8"
						sparkle
					/>
				</div>
				<NavBar active="about" />
				<main className="portfolio-main">
					<AboutSection />
					<SkillsSection />
				</main>
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default About;
