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
import ShapeGrid from "../components/interactive/ShapeGrid";

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
				<div className="home-shape-grid" aria-hidden="true">
					<ShapeGrid
						borderColor="#ffffff"
						direction="down"
						hoverFillColor="#65d6c7"
						hoverTrailAmount={5}
						speed={0.47}
						squareSize={54}
					/>
				</div>
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
