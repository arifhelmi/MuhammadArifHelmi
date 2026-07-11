import React from "react";

import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import SeoHead from "../components/common/SeoHead";
import AboutSection from "../components/home/AboutSection";
import SkillsSection from "../components/home/SkillsSection";

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
