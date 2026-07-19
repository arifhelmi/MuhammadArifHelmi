import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import BubbleMenu from "../interactive/BubbleMenu";
import GooeyNav from "../interactive/GooeyNav";
import "./styles/navBar.css";

const NAV_LINKS = [
	{ label: "Home", key: "home" },
	{ label: "About", key: "about" },
	{ label: "Experience", key: "experience" },
	{ label: "Projects", key: "projects" },
	{ label: "Skills", key: "skills" },
	{ label: "Contact", key: "contact" },
];

const NavBar = ({ active }) => {
	const location = useLocation();
	const isHomepage = location.pathname === "/";
	const [activeSection, setActiveSection] = useState(isHomepage ? "home" : active || "home");
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		if (!isHomepage) {
			setActiveSection(active || "home");
		}

		let frameId;
		const updateNavigation = () => {
			setIsScrolled(window.scrollY > 18);

			if (!isHomepage) {
				return;
			}

			const marker = window.scrollY + window.innerHeight * 0.34;
			let current = "home";

			NAV_LINKS.forEach((link) => {
				const section = document.getElementById(link.key);
				if (section && section.offsetTop <= marker) {
					current = link.key;
				}
			});

			setActiveSection(current);
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

	const handleSectionClick = useCallback((event, sectionId) => {
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
	}, [isHomepage]);

	const menuItems = useMemo(() => NAV_LINKS.map((link) => ({
		...link,
		active: activeSection === link.key,
		href: isHomepage ? `#${link.key}` : `/#${link.key}`,
		onClick: (event) => handleSectionClick(event, link.key),
	})), [activeSection, handleSectionClick, isHomepage]);

	const activeIndex = Math.max(0, NAV_LINKS.findIndex((link) => link.key === activeSection));

	return (
		<>
			<div className={`nav-container${isScrolled ? " is-scrolled" : ""}`}>
				<nav className="navbar" aria-label="Main navigation">
					<div className="nav-background">
						<a
							className="nav-brand"
							href={isHomepage ? "#home" : "/#home"}
							onClick={(event) => handleSectionClick(event, "home")}
						>
							<span className="nav-brand-mark">MH</span>
							<span className="nav-brand-copy">
								<strong>Muhammad Arif Helmi</strong>
								<small>Full-Stack Developer</small>
							</span>
						</a>

						<GooeyNav
							activeIndex={activeIndex}
							items={menuItems}
							particleCount={48}
							particleR={800}
							timeVariance={800}
						/>

						<a
							className="nav-contact"
							href={isHomepage ? "#contact" : "/#contact"}
							onClick={(event) => handleSectionClick(event, "contact")}
						>
							Let&apos;s talk
							<FontAwesomeIcon icon={faArrowRight} />
						</a>
					</div>
				</nav>
			</div>

			<div className="nav-mobile-shell">
				<BubbleMenu
					animationDuration={1.05}
					animationEase="elastic.out(1,0.5)"
					items={menuItems}
					logo={(
						<>
							<strong>MH</strong>
							<span>Arif Helmi</span>
						</>
					)}
					menuBg="#000000"
					menuContentColor="#ffffff"
					staggerDelay={0.26}
				/>
			</div>
		</>
	);
};

export default NavBar;
