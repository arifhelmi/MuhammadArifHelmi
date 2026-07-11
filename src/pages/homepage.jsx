import React from "react";

import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import SeoHead from "../components/common/SeoHead";
import AboutSection from "../components/home/AboutSection";
import ContactSection from "../components/home/ContactSection";
import ExperienceSection from "../components/home/ExperienceSection";
import HeroSection from "../components/home/HeroSection";
import ProjectsSection from "../components/home/ProjectsSection";
import SkillsSection from "../components/home/SkillsSection";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";

const Homepage = () => {
	const currentSEO = SEO.find((item) => item.page === "home");

	return (
		<React.Fragment>
			<SeoHead
				description={currentSEO.description}
				keywords={currentSEO.keywords}
				title={INFO.main.title}
			/>

			<div className="page-content home-page">
				<NavBar />
				<main className="portfolio-main" aria-labelledby="portfolio-title">
					<HeroSection />
					<AboutSection />
					<ExperienceSection />
					<ProjectsSection />
					<SkillsSection />
					<ContactSection />
				</main>
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default Homepage;
