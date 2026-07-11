import React from "react";

import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import SeoHead from "../components/common/SeoHead";
import ProjectsSection from "../components/home/ProjectsSection";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/projects.css";

const Projects = () => {
	const currentSEO = SEO.find((item) => item.page === "projects");

	return (
		<React.Fragment>
			<SeoHead
				description={currentSEO.description}
				keywords={currentSEO.keywords}
				title={`Projects | ${INFO.main.title}`}
			/>

			<div className="page-content home-page projects-page">
				<NavBar active="projects" />
				<main className="portfolio-main">
					<ProjectsSection showAllLink={false} />
				</main>
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default Projects;
