import React from "react";

import CreatorLanding from "../components/creator/CreatorLanding";
import SeoHead from "../components/common/SeoHead";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";
import "./styles/creator-landing.css";

const Homepage = () => {
	const currentSEO = SEO.find((item) => item.page === "home");

	return (
		<React.Fragment>
			<SeoHead
				description={currentSEO.description}
				keywords={currentSEO.keywords}
				title={INFO.main.title}
			/>

			<div className="page-content creator-home-page">
				<main aria-labelledby="portfolio-title">
					<CreatorLanding />
				</main>
			</div>
		</React.Fragment>
	);
};

export default Homepage;
