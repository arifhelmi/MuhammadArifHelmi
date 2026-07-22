import React, { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowDown,
	faArrowRight,
	faArrowUpRightFromSquare,
	faCheck,
	faCode,
	faCopy,
	faDatabase,
	faEnvelope,
	faFileLines,
	faLayerGroup,
	faLock,
	faServer,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import BubbleMenu from "../interactive/BubbleMenu";
import INFO from "../../data/user";

const FadeIn = ({ children, className = "", delay = 0, as = "div", ...props }) => {
	const MotionElement = motion[as] || motion.div;
	const animationProps = process.env.NODE_ENV === "test"
		? {}
		: {
			initial: { opacity: 0, y: 28 },
			transition: { delay, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
			viewport: { once: true, amount: 0.12 },
			whileInView: { opacity: 1, y: 0 },
		};

	return (
		<MotionElement
			{...props}
			{...animationProps}
			className={className}
		>
			{children}
		</MotionElement>
	);
};

const ContactButton = ({ label = "Contact me" }) => (
	<a className="creator-contact-button" href="#contact">
		<span>{label}</span>
		<FontAwesomeIcon icon={faArrowRight} />
	</a>
);

const Magnet = ({ children, className = "" }) => {
	const ref = useRef(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMove = (event) => {
		const element = ref.current;
		if (!element || window.matchMedia("(pointer: coarse)").matches) {
			return;
		}

		const bounds = element.getBoundingClientRect();
		setPosition({
			x: (event.clientX - bounds.left - bounds.width / 2) / 5,
			y: (event.clientY - bounds.top - bounds.height / 2) / 5,
		});
	};

	return (
		<motion.div
			animate={{ x: position.x, y: position.y }}
			className={className}
			onMouseLeave={() => setPosition({ x: 0, y: 0 })}
			onMouseMove={handleMove}
			ref={ref}
			transition={{ type: "spring", stiffness: 125, damping: 18, mass: 0.55 }}
		>
			{children}
		</motion.div>
	);
};

const AnimatedCharacter = ({ character, progress, start, end }) => {
	const opacity = useTransform(progress, [start, end], [0.18, 1]);

	return (
		<span className="creator-animated-character">
			<span aria-hidden="true">{character}</span>
			<motion.span aria-hidden="true" style={{ opacity }}>
				{character}
			</motion.span>
		</span>
	);
};

const AnimatedText = ({ children }) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.82", "end 0.28"],
	});
	const characters = Array.from(children);

	return (
		<p className="creator-animated-text" ref={ref}>
			<span className="sr-only">{children}</span>
			{characters.map((character, index) => {
				const start = index / Math.max(characters.length, 1);
				const end = Math.min(1, start + 0.1);

				return (
					<AnimatedCharacter
						character={character}
						end={end}
						key={`${character}-${index}`}
						progress={scrollYProgress}
						start={start}
					/>
				);
			})}
		</p>
	);
};

const CreatorNavigation = () => {
	const links = [
		{ key: "about", label: "About", href: "#about" },
		{ key: "experience", label: "Experience", href: "#experience" },
		{ key: "projects", label: "Projects", href: "#projects" },
		{ key: "contact", label: "Contact", href: "#contact" },
	];

	return (
		<>
			<nav className="creator-nav" aria-label="Main navigation">
				<a className="creator-nav-brand" href="#home">
					<span>MAH</span>
					Muhammad Arif Helmi
				</a>
				<div className="creator-nav-links">
					{links.map((link) => (
						<a href={link.href} key={link.key}>{link.label}</a>
					))}
				</div>
				<a className="creator-nav-status" href={INFO.socials.cv} target="_blank" rel="noreferrer">
					CV 2026
					<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
				</a>
			</nav>

			<div className="creator-mobile-nav">
				<BubbleMenu
					animationDuration={1.05}
					animationEase="elastic.out(1,0.5)"
					items={links}
					logo={<><strong>MH</strong><span>Arif Helmi</span></>}
					menuBg="#0c0c0c"
					menuContentColor="#ffffff"
					staggerDelay={0.16}
				/>
			</div>
		</>
	);
};

const CreatorHero = () => (
	<section className="creator-hero" id="home">
		<CreatorNavigation />

		<FadeIn as="div" className="creator-hero-heading" delay={0.1}>
			<p>Hi, I&apos;m</p>
			<h1 aria-label="Muhammad Arif Helmi" id="portfolio-title">
				<span>Muhammad</span>
				<span>Arif Helmi</span>
			</h1>
		</FadeIn>

		<FadeIn as="div" className="creator-portrait-stage" delay={0.48}>
			<Magnet className="creator-portrait-magnet">
				<img
					alt="Illustrated portrait of Muhammad Arif Helmi"
					className="creator-portrait"
					draggable="false"
					src="/muhammad-arif-helmi-portrait.png"
				/>
			</Magnet>
		</FadeIn>

		<div className="creator-hero-bottom">
			<FadeIn as="div" className="creator-hero-intro" delay={0.34}>
				<span className="creator-index-label">01 / Profile</span>
				<p>A full stack developer crafting dependable software for real business workflows.</p>
			</FadeIn>

			<FadeIn as="div" className="creator-hero-action" delay={0.42}>
				<p>Jakarta, Indonesia<br />Available for product delivery</p>
				<ContactButton />
			</FadeIn>
		</div>

		<a className="creator-scroll-cue" href="#work-preview" aria-label="Scroll to selected work">
			<FontAwesomeIcon icon={faArrowDown} />
		</a>
	</section>
);

const ProjectTile = ({ project, index }) => (
	<article className="creator-marquee-tile">
		<span>{String(index + 1).padStart(2, "0")}</span>
		<div className="creator-marquee-mark" aria-hidden="true">{project.initial}</div>
		<div>
			<small>{project.category}</small>
			<h3>{project.title}</h3>
		</div>
	</article>
);

const StackTile = ({ skill, index }) => (
	<article className="creator-marquee-tile creator-marquee-stack">
		<span>{skill.code}</span>
		<div className="creator-stack-lines" aria-hidden="true">
			<i />
			<i />
			<i />
		</div>
		<div>
			<small>Technical stack</small>
			<h3>{skill.items.slice(0, 3).join(" / ")}</h3>
		</div>
	</article>
);

const MarqueeSection = () => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const rowOneX = useTransform(scrollYProgress, [0, 1], [-180, 120]);
	const rowTwoX = useTransform(scrollYProgress, [0, 1], [130, -190]);
	const projects = [...INFO.projects, ...INFO.projects];
	const skills = [...INFO.skills, ...INFO.skills, ...INFO.skills];

	return (
		<section className="creator-marquee" id="work-preview" ref={ref} aria-label="Selected work preview">
			<div className="creator-marquee-label">
				<span>Selected systems</span>
				<span>Scroll to explore</span>
			</div>
			<motion.div className="creator-marquee-track" style={{ x: rowOneX }}>
				{projects.map((project, index) => (
					<ProjectTile index={index % INFO.projects.length} key={`${project.title}-${index}`} project={project} />
				))}
			</motion.div>
			<motion.div className="creator-marquee-track creator-marquee-track-reverse" style={{ x: rowTwoX }}>
				{skills.map((skill, index) => (
					<StackTile index={index} key={`${skill.title}-${index}`} skill={skill} />
				))}
			</motion.div>
		</section>
	);
};

const CreatorAbout = () => {
	const objects = [
		{ icon: faCode, label: "Application", className: "is-top-left" },
		{ icon: faServer, label: "Backend", className: "is-bottom-left" },
		{ icon: faLayerGroup, label: "Frontend", className: "is-top-right" },
		{ icon: faDatabase, label: "Data", className: "is-bottom-right" },
	];

	return (
		<section className="creator-about" id="about">
			{objects.map((object, index) => (
				<FadeIn className={`creator-about-object ${object.className}`} delay={index * 0.08} key={object.label}>
					<FontAwesomeIcon icon={object.icon} />
					<span>{object.label}</span>
				</FadeIn>
			))}

			<div className="creator-about-content">
				<FadeIn>
					<span className="creator-index-label">02 / About me</span>
					<h2 className="creator-gradient-heading">About me</h2>
				</FadeIn>

				<AnimatedText>
					I build enterprise software, e-commerce platforms, attendance tools, and marketplace products with a focus on reliable workflows, clear interfaces, and changes that are safe to ship. From ASP.NET MVC and C# to Laravel, React.js, and SQL, I turn business rules into practical products that stay useful in production.
				</AnimatedText>

				<FadeIn className="creator-about-cta" delay={0.1}>
					<a href={INFO.socials.cv} target="_blank" rel="noreferrer">
						<FontAwesomeIcon icon={faFileLines} />
						Read my resume
					</a>
				</FadeIn>
			</div>
		</section>
	);
};

const CreatorExperience = () => (
	<section className="creator-experience" id="experience">
		<div className="creator-section-shell">
			<FadeIn className="creator-section-title">
				<span className="creator-index-label">03 / Experience</span>
				<h2>Experience</h2>
				<p>Enterprise delivery, AI data quality, public-sector tooling, and practical application development.</p>
			</FadeIn>

			<div className="creator-experience-list">
				{INFO.experience.map((experience, index) => (
					<FadeIn as="article" className="creator-experience-item" delay={index * 0.06} key={experience.project}>
						<span className="creator-experience-number">{String(index + 1).padStart(2, "0")}</span>
						<div className="creator-experience-copy">
							<div>
								<small>{experience.location}</small>
								<h3>{experience.role}</h3>
								<h4>{experience.project}</h4>
							</div>
							<p>{experience.description} {experience.impact}</p>
							<ul aria-label="Technology stack">
								{experience.stack.map((item) => <li key={item}>{item}</li>)}
							</ul>
						</div>
					</FadeIn>
				))}
			</div>
		</div>
	</section>
);

const StickyProjectCard = ({ project, index, total }) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const targetScale = 1 - (total - 1 - index) * 0.025;
	const rawScale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
	const scale = useSpring(rawScale, { stiffness: 90, damping: 24, mass: 0.4 });

	return (
		<div className="creator-project-sticky-slot" ref={ref}>
			<motion.article
				className="creator-project-card"
				style={{
					"--project-index": index,
					"--project-accent": ["#c9ff47", "#ff9257", "#8eb8ff"][index % 3],
					scale,
				}}
			>
				<div className="creator-project-card-head">
					<span>{String(index + 1).padStart(2, "0")}</span>
					<div>
						<small>{project.category}</small>
						<h3>{project.title}</h3>
					</div>
					<span className="creator-project-private"><FontAwesomeIcon icon={faLock} /> Private product</span>
				</div>

				<div className="creator-project-card-grid">
					<div className="creator-project-side">
						<div className="creator-project-panel creator-project-overview">
							<span>System brief</span>
							<p>{project.description}</p>
						</div>
						<div className="creator-project-panel creator-project-mark-panel">
							<span>{project.initial}</span>
							<ul>
								{project.features.map((feature) => <li key={feature}>{feature}</li>)}
							</ul>
						</div>
					</div>

					<div className="creator-project-system" aria-label={`${project.title} technology overview`}>
						<div className="creator-project-system-top">
							<span>Architecture / Delivery</span>
							<span>Production</span>
						</div>
						<div className="creator-system-map" aria-hidden="true">
							<div className="creator-system-node is-main">{project.initial}</div>
							{project.stack.slice(0, 4).map((item, stackIndex) => (
								<div className={`creator-system-node is-node-${stackIndex + 1}`} key={item}>{item}</div>
							))}
						</div>
						<div className="creator-project-system-footer">
							<span>Reliable workflow</span>
							<span>Clear interface</span>
							<span>Maintainable delivery</span>
						</div>
					</div>
				</div>
			</motion.article>
		</div>
	);
};

const CreatorProjects = () => {
	const featuredProjects = INFO.projects.slice(0, 3);

	return (
		<section className="creator-projects" id="projects">
			<div className="creator-section-shell">
				<FadeIn className="creator-projects-heading">
					<div>
						<span className="creator-index-label">04 / Selected projects</span>
						<h2 className="creator-gradient-heading">Projects</h2>
					</div>
					<a href="/projects">View all projects <FontAwesomeIcon icon={faArrowRight} /></a>
				</FadeIn>

				<div className="creator-project-stack">
					{featuredProjects.map((project, index) => (
						<StickyProjectCard
							index={index}
							key={project.title}
							project={project}
							total={featuredProjects.length}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

const CreatorSkills = () => (
	<section className="creator-skills" id="skills">
		<div className="creator-section-shell">
			<FadeIn className="creator-skills-heading">
				<span className="creator-index-label">05 / Toolbox</span>
				<h2>Tools selected for dependable delivery.</h2>
			</FadeIn>

			<div className="creator-skills-grid">
				{INFO.skills.map((skill, index) => (
					<FadeIn as="article" className="creator-skill-item" delay={index * 0.06} key={skill.title}>
						<span>{String(index + 1).padStart(2, "0")}</span>
						<h3>{skill.title}</h3>
						<p>{skill.items.join(" · ")}</p>
					</FadeIn>
				))}
			</div>
		</div>
	</section>
);

const CreatorContact = () => {
	const [copied, setCopied] = useState(false);
	const socials = useMemo(() => [
		{ label: "GitHub", href: INFO.socials.github, icon: faGithub },
		{ label: "LinkedIn", href: INFO.socials.linkedin, icon: faLinkedinIn },
		{ label: "Resume", href: INFO.socials.cv, icon: faFileLines },
	], []);

	const copyEmail = async () => {
		if (!navigator.clipboard) {
			window.location.href = `mailto:${INFO.main.email}`;
			return;
		}

		await navigator.clipboard.writeText(INFO.main.email);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1800);
	};

	return (
		<section className="creator-contact" id="contact">
			<div className="creator-contact-inner">
				<FadeIn>
					<span className="creator-index-label">06 / Contact</span>
					<h2>Let&apos;s build something<br />worth shipping.</h2>
					<p>Have a product idea, backend challenge, or workflow that needs a reliable implementation?</p>
				</FadeIn>

				<FadeIn className="creator-contact-primary" delay={0.08}>
					<a href={`mailto:${INFO.main.email}`}>
						<FontAwesomeIcon icon={faEnvelope} />
						<span>{INFO.main.email}</span>
						<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
					</a>
					<button onClick={copyEmail} title="Copy email address" type="button">
						<FontAwesomeIcon icon={copied ? faCheck : faCopy} />
						<span className="sr-only">{copied ? "Email copied" : "Copy email address"}</span>
					</button>
				</FadeIn>

				<div className="creator-contact-links">
					{socials.map((social) => (
						<a href={social.href} key={social.label} target="_blank" rel="noreferrer">
							<FontAwesomeIcon icon={social.icon} />
							{social.label}
							<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
						</a>
					))}
				</div>
			</div>

			<footer className="creator-footer">
				<span>© {new Date().getFullYear()} Muhammad Arif Helmi</span>
				<span>Full Stack Developer · Jakarta, Indonesia</span>
				<a href="#home">Back to top <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
			</footer>
		</section>
	);
};

const CreatorLanding = () => (
	<div className="creator-landing">
		<CreatorHero />
		<MarqueeSection />
		<CreatorAbout />
		<CreatorExperience />
		<CreatorProjects />
		<CreatorSkills />
		<CreatorContact />
	</div>
);

export default CreatorLanding;
