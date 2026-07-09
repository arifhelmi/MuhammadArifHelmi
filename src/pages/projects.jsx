import React from "react";
import { Helmet } from "react-helmet";

import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import Reveal from "../components/common/Reveal";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/projects.css";

const Projects = () => {
	const currentSEO = SEO.find((item) => item.page === "projects");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Projects | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="projects" />
				<main className="content-wrapper projects-container">
					<Reveal as="section" className="projects-hero">
						<div className="eyebrow">Projects</div>
						<h1 className="title projects-title">
							Backend-heavy products, mobile apps, and web experiences.
						</h1>

						<p className="subtitle projects-subtitle">
							Here are selected projects I have worked on independently and
							with teams. The common thread is practical product delivery:
							clear backend contracts, reliable integrations, and features
							that can grow after launch.
						</p>

						<div className="projects-summary">
							{INFO.highlights.map((highlight) => (
								<div className="summary-item" key={highlight.label}>
									<strong>{highlight.value}</strong>
									<span>{highlight.label}</span>
								</div>
							))}
						</div>
					</Reveal>

					<Reveal as="section" className="projects-list" delay={120}>
						<AllProjects />
					</Reveal>

					<div className="page-footer">
						<Footer />
					</div>
				</main>
			</div>
		</React.Fragment>
	);
};

export default Projects;
