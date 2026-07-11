import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./styles/navBar.css";

const NAV_LINKS = [
	{ label: "Home", key: "home" },
	{ label: "About", key: "about" },
	{ label: "Experience", key: "experience" },
	{ label: "Projects", key: "projects" },
	{ label: "Skills", key: "skills" },
	{ label: "Contact", key: "contact" },
];

const NavBar = (props) => {
	const { active } = props;
	const location = useLocation();
	const isHomepage = location.pathname === "/";
	const [activeSection, setActiveSection] = useState(isHomepage ? "home" : active);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	useEffect(() => {
		setIsMenuOpen(false);

		if (!isHomepage) {
			setActiveSection(active);
			return undefined;
		}

		let frameId;
		const updateNavigation = () => {
			const marker = window.scrollY + window.innerHeight * 0.34;
			let current = "home";

			NAV_LINKS.forEach((link) => {
				const section = document.getElementById(link.key);
				if (section && section.offsetTop <= marker) {
					current = link.key;
				}
			});

			setActiveSection(current);
			setIsScrolled(window.scrollY > 18);
		};

		const handleScroll = () => {
			window.cancelAnimationFrame(frameId);
			frameId = window.requestAnimationFrame(updateNavigation);
		};

		updateNavigation();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		return () => {
			window.cancelAnimationFrame(frameId);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [active, isHomepage]);

	const handleSectionClick = (event, sectionId) => {
		setIsMenuOpen(false);

		if (!isHomepage) {
			return;
		}

		const section = document.getElementById(sectionId);
		if (!section) {
			return;
		}

		event.preventDefault();
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
		window.history.replaceState(null, "", `#${sectionId}`);
	};

	const currentSection = isHomepage ? activeSection : active;

	return (
		<div className={`nav-container${isScrolled ? " is-scrolled" : ""}${isMenuOpen ? " is-open" : ""}`}>
			<nav className="navbar" aria-label="Main navigation">
					<div className="nav-background">
						<a className="nav-brand" href={isHomepage ? "#home" : "/#home"} onClick={(event) => handleSectionClick(event, "home")}>
							<span className="nav-brand-mark">MH</span>
							<span className="nav-brand-copy">
								<strong>Muhammad Arif Helmi</strong>
								<small>Full-Stack Developer</small>
							</span>
						</a>

						<ul className={`nav-list${isMenuOpen ? " is-visible" : ""}`}>
							{NAV_LINKS.map((link) => (
								<li
									className={
										currentSection === link.key
											? "nav-item active"
											: "nav-item"
									}
									key={link.key}
								>
									<a
										aria-current={
											currentSection === link.key ? "page" : undefined
										}
										href={isHomepage ? `#${link.key}` : `/#${link.key}`}
										onClick={(event) => handleSectionClick(event, link.key)}
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>

						<a className="nav-contact" href={isHomepage ? "#contact" : "/#contact"} onClick={(event) => handleSectionClick(event, "contact")}>
							Let&apos;s talk
							<FontAwesomeIcon icon={faArrowRight} />
						</a>

						<button
							aria-expanded={isMenuOpen}
							aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
							className="nav-menu-button"
							onClick={() => setIsMenuOpen((value) => !value)}
							type="button"
						>
							<FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
						</button>
					</div>
			</nav>
		</div>
	);
};

export default NavBar;
