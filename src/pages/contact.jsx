import React from "react";

import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import SeoHead from "../components/common/SeoHead";
import ContactSection from "../components/home/ContactSection";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/contact.css";

const Contact = () => {
	const currentSEO = SEO.find((item) => item.page === "contact");

	return (
		<React.Fragment>
			<SeoHead
				description={currentSEO.description}
				keywords={currentSEO.keywords}
				title={`Contact | ${INFO.main.title}`}
			/>

			<div className="page-content home-page contact-page">
				<NavBar active="contact" />
				<main className="portfolio-main">
					<ContactSection />
				</main>
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default Contact;
