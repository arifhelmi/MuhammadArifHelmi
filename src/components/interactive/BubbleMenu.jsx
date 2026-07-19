import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import "./styles/BubbleMenu.css";

const BubbleMenu = ({
	logo,
	items,
	menuAriaLabel = "Toggle navigation menu",
	menuBg = "#000000",
	menuContentColor = "#ffffff",
	animationEase = "elastic.out(1,0.5)",
	animationDuration = 1.05,
	staggerDelay = 0.26,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showOverlay, setShowOverlay] = useState(false);
	const toggleRef = useRef(null);
	const overlayRef = useRef(null);
	const bubblesRef = useRef([]);
	const labelsRef = useRef([]);

	const closeMenu = () => setIsMenuOpen(false);

	const handleToggle = () => {
		const nextState = !isMenuOpen;
		if (nextState) {
			setShowOverlay(true);
		}
		setIsMenuOpen(nextState);
	};

	useEffect(() => {
		if (!showOverlay) {
			return undefined;
		}

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				closeMenu();
				toggleRef.current?.focus();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [showOverlay]);

	useEffect(() => {
		const overlay = overlayRef.current;
		const bubbles = bubblesRef.current.filter(Boolean);
		const labels = labelsRef.current.filter(Boolean);

		if (!overlay || bubbles.length === 0) {
			return;
		}

		gsap.killTweensOf([...bubbles, ...labels, overlay]);

		if (isMenuOpen) {
			gsap.set(overlay, { autoAlpha: 1, display: "flex" });
			gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
			gsap.set(labels, { autoAlpha: 0, y: 24 });

			bubbles.forEach((bubble, index) => {
				const delay = index * staggerDelay;
				const timeline = gsap.timeline({ delay });

				timeline.to(bubble, {
					duration: animationDuration,
					ease: animationEase,
					scale: 1,
				});

				if (labels[index]) {
					timeline.to(
						labels[index],
						{
							autoAlpha: 1,
							duration: Math.min(animationDuration, 0.55),
							ease: "power3.out",
							y: 0,
						},
						`-=${animationDuration * 0.88}`,
					);
				}
			});
		} else {
			gsap.to(labels, {
				autoAlpha: 0,
				duration: 0.18,
				ease: "power3.in",
				y: 18,
			});
			gsap.to(bubbles, {
				duration: 0.22,
				ease: "power3.in",
				scale: 0,
				onComplete: () => setShowOverlay(false),
			});
		}
	}, [animationDuration, animationEase, isMenuOpen, showOverlay, staggerDelay]);

	return (
		<>
			<nav className="rb-bubble-menu" aria-label="Mobile navigation">
				<div className="rb-bubble rb-bubble-logo" style={{ background: menuBg }}>
					{logo}
				</div>

				<button
					aria-controls="mobile-navigation-overlay"
					aria-expanded={isMenuOpen}
					aria-label={menuAriaLabel}
					className={`rb-bubble rb-bubble-toggle${isMenuOpen ? " is-open" : ""}`}
					onClick={handleToggle}
					ref={toggleRef}
					style={{ background: menuBg }}
					type="button"
				>
					<span style={{ background: menuContentColor }} />
					<span style={{ background: menuContentColor }} />
				</button>
			</nav>

			{showOverlay && (
				<div
					aria-hidden={!isMenuOpen}
					className="rb-bubble-overlay"
					id="mobile-navigation-overlay"
					ref={overlayRef}
				>
					<div className="rb-bubble-overlay-backdrop" onClick={closeMenu} />
					<ul aria-label="Menu links" className="rb-bubble-list">
						{items.map((item, index) => (
							<li key={item.key || item.label}>
								<a
									aria-current={item.active ? "page" : undefined}
									href={item.href}
									onClick={(event) => {
										item.onClick?.(event);
										closeMenu();
									}}
									ref={(element) => {
										bubblesRef.current[index] = element;
									}}
									style={{
										"--bubble-active": item.active ? "#65d6c7" : menuContentColor,
										"--bubble-bg": menuBg,
										"--bubble-color": menuContentColor,
									}}
								>
									<span
										ref={(element) => {
											labelsRef.current[index] = element;
										}}
									>
										<small>{String(index + 1).padStart(2, "0")}</small>
										{item.label}
									</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default BubbleMenu;
