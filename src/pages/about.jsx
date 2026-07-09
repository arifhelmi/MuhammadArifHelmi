import React from "react";
import { Helmet } from "react-helmet";

import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import Reveal from "../components/common/Reveal";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/about.css";

const About = () => {
	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="about" />
				<main className="content-wrapper about-container">
					<section className="about-hero">
						<Reveal className="about-copy">
							<div className="eyebrow">About</div>
							<h1 className="title about-title">{INFO.about.title}</h1>
							<p className="subtitle about-subtitle">
								{INFO.about.description}
							</p>
						</Reveal>

						<Reveal className="about-image-container" delay={120}>
							<div className="about-image-wrapper">
								<img
									src="about.jpg"
									alt="Muhammad Arif Helmi outdoors"
									className="about-image"
								/>
							</div>
						</Reveal>
					</section>

					<section className="about-detail-grid">
						<Reveal className="about-story" delay={120}>
							<div className="section-kicker">How I work</div>
							<h2 className="section-title">Calm systems, clear delivery.</h2>
							<p>
								I like working close to product goals, then translating those
								goals into APIs, data models, and backend flows that teammates
								can build on. The result should feel simple from the outside
								even when the internals are doing serious work.
							</p>
							<ul className="principles-list">
								{INFO.principles.map((principle) => (
									<li key={principle}>{principle}</li>
								))}
							</ul>
						</Reveal>

						<Reveal className="about-social-panel" delay={180}>
							<Socials />
						</Reveal>
					</section>

					<Reveal as="section" className="about-skills" delay={120}>
						<div className="section-heading">
							<div className="section-kicker">Toolbox</div>
							<h2 className="section-title">What I bring to a team.</h2>
						</div>

						<div className="skill-grid">
							{INFO.skills.map((skill) => (
								<article className="skill-card" key={skill.title}>
									<h3>{skill.title}</h3>
									<div className="chip-list">
										{skill.items.map((item) => (
											<span className="chip" key={item}>
												{item}
											</span>
										))}
									</div>
								</article>
							))}
						</div>
					</Reveal>

					<div className="page-footer">
						<Footer />
					</div>
				</main>
			</div>
		</React.Fragment>
	);
};

export default About;
