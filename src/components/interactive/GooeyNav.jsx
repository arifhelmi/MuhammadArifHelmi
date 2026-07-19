import React, { useEffect, useRef, useState } from "react";

import "./styles/GooeyNav.css";

const GooeyNav = ({
	items,
	activeIndex = 0,
	animationTime = 600,
	particleCount = 48,
	particleDistances = [68, 8],
	particleR = 800,
	timeVariance = 800,
	colors = [1, 2, 3, 1, 2, 3, 4],
}) => {
	const containerRef = useRef(null);
	const filterRef = useRef(null);
	const navRef = useRef(null);
	const textRef = useRef(null);
	const timersRef = useRef([]);
	const particleRunRef = useRef(0);
	const [selectedIndex, setSelectedIndex] = useState(activeIndex);
	const [particles, setParticles] = useState([]);

	const noise = (amount = 1) => amount / 2 - Math.random() * amount;

	const getPosition = (distance, pointIndex, totalPoints) => {
		const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
		return [distance * Math.cos(angle), distance * Math.sin(angle)];
	};

	const updateEffectPosition = (element) => {
		if (!containerRef.current || !filterRef.current || !textRef.current || !element) {
			return;
		}

		const containerRect = containerRef.current.getBoundingClientRect();
		const position = element.getBoundingClientRect();
		const styles = {
			height: `${position.height}px`,
			left: `${position.x - containerRect.x}px`,
			top: `${position.y - containerRect.y}px`,
			width: `${position.width}px`,
		};

		Object.assign(filterRef.current.style, styles);
		Object.assign(textRef.current.style, styles);
		textRef.current.innerText = element.innerText;
	};

	const makeParticles = (element) => {
		const bubbleTime = animationTime * 2 + timeVariance;
		element.style.setProperty("--gooey-time", `${bubbleTime}ms`);
		particleRunRef.current += 1;
		const runId = particleRunRef.current;
		const nextParticles = [];
		let longestTime = 0;

		for (let index = 0; index < particleCount; index += 1) {
			const time = animationTime * 2 + noise(timeVariance * 2);
			longestTime = Math.max(longestTime, time);
			const rotateBase = noise(particleR / 10);
			const rotate = rotateBase > 0
				? (rotateBase + particleR / 20) * 10
				: (rotateBase - particleR / 20) * 10;
			const start = getPosition(particleDistances[0], particleCount - index, particleCount);
			const end = getPosition(particleDistances[1] + noise(7), particleCount - index, particleCount);

			nextParticles.push({
				color: colors[Math.floor(Math.random() * colors.length)],
				end,
				id: `${runId}-${index}`,
				rotate,
				scale: 1 + noise(0.2),
				start,
				time,
			});
		}

		timersRef.current.forEach((timer) => window.clearTimeout(timer));
		timersRef.current = [];
		const createTimer = window.setTimeout(() => setParticles(nextParticles), 30);
		const removeTimer = window.setTimeout(() => setParticles([]), longestTime + 120);
		timersRef.current.push(createTimer, removeTimer);
		window.requestAnimationFrame(() => element.classList.add("is-active"));
	};

	const activateItem = (element, index) => {
		if (!element || selectedIndex === index) {
			return;
		}

		setSelectedIndex(index);
		updateEffectPosition(element);
		setParticles([]);
		filterRef.current?.classList.remove("is-active");
		textRef.current?.classList.remove("is-active");

		if (textRef.current) {
			void textRef.current.offsetWidth;
			textRef.current.classList.add("is-active");
		}

		if (filterRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			makeParticles(filterRef.current);
		}
	};

	useEffect(() => {
		setSelectedIndex(activeIndex);
	}, [activeIndex]);

	useEffect(() => {
		const activeItem = navRef.current?.querySelectorAll("li")[selectedIndex];
		if (activeItem) {
			updateEffectPosition(activeItem);
			textRef.current?.classList.add("is-active");
		}

		if (!containerRef.current || typeof ResizeObserver === "undefined") {
			return undefined;
		}

		const observer = new ResizeObserver(() => {
			const currentItem = navRef.current?.querySelectorAll("li")[selectedIndex];
			updateEffectPosition(currentItem);
		});

		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [selectedIndex]);

	useEffect(() => () => {
		timersRef.current.forEach((timer) => window.clearTimeout(timer));
	}, []);

	return (
		<div className="gooey-nav-container" ref={containerRef}>
			<nav aria-label="Desktop navigation">
				<ul ref={navRef}>
					{items.map((item, index) => (
						<li className={selectedIndex === index ? "is-active" : ""} key={item.key || item.label}>
							<a
								aria-current={selectedIndex === index ? "page" : undefined}
								href={item.href}
								onClick={(event) => {
									item.onClick?.(event);
									activateItem(event.currentTarget.parentElement, index);
								}}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
			<span aria-hidden="true" className="gooey-effect gooey-filter" ref={filterRef}>
				{particles.map((particle) => (
					<span
						className="gooey-particle"
						key={particle.id}
						style={{
							"--end-x": `${particle.end[0]}px`,
							"--end-y": `${particle.end[1]}px`,
							"--gooey-time": `${particle.time}ms`,
							"--point-color": `var(--gooey-color-${particle.color})`,
							"--point-rotate": `${particle.rotate}deg`,
							"--point-scale": particle.scale,
							"--start-x": `${particle.start[0]}px`,
							"--start-y": `${particle.start[1]}px`,
						}}
					>
						<span className="gooey-point" />
					</span>
				))}
			</span>
			<span aria-hidden="true" className="gooey-effect gooey-text" ref={textRef} />
		</div>
	);
};

export default GooeyNav;
