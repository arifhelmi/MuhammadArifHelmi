import React, { memo, useEffect, useRef } from "react";

import "./styles/DotField.css";

const TWO_PI = Math.PI * 2;

const DotField = memo(({
	dotRadius = 1,
	dotSpacing = 19,
	cursorRadius = 1000,
	cursorForce = 0.02,
	bulgeOnly = false,
	bulgeStrength = 48,
	glowRadius = 50,
	sparkle = true,
	waveAmplitude = 0,
	gradientFrom = "#94a3b8",
	gradientTo = "#94a3b8",
	glowColor = "#000000",
	className = "",
}) => {
	const canvasRef = useRef(null);
	const dotsRef = useRef([]);
	const glowRef = useRef(null);
	const propsRef = useRef({});
	const rebuildRef = useRef(null);
	const frameRef = useRef(null);
	const sizeRef = useRef({ height: 0, left: 0, top: 0, width: 0 });
	const pointerRef = useRef({ previousX: -9999, previousY: -9999, speed: 0, x: -9999, y: -9999 });
	const engagementRef = useRef(0);
	const glowOpacityRef = useRef(0);
	const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);

	propsRef.current = {
		bulgeOnly,
		bulgeStrength,
		cursorForce,
		cursorRadius,
		dotRadius,
		dotSpacing,
		gradientFrom,
		gradientTo,
		sparkle,
		waveAmplitude,
	};

	useEffect(() => {
		if (typeof navigator !== "undefined" && navigator.userAgent.includes("jsdom")) {
			return undefined;
		}

		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d", { alpha: true });
		if (!canvas || !context) {
			return undefined;
		}

		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		let resizeTimer;
		let frameCount = 0;

		const buildDots = (width, height) => {
			const settings = propsRef.current;
			const step = settings.dotRadius + settings.dotSpacing;
			const columns = Math.floor(width / step);
			const rows = Math.floor(height / step);
			const paddingX = (width % step) / 2;
			const paddingY = (height % step) / 2;
			const dots = [];

			for (let row = 0; row < rows; row += 1) {
				for (let column = 0; column < columns; column += 1) {
					const anchorX = paddingX + column * step + step / 2;
					const anchorY = paddingY + row * step + step / 2;
					dots.push({ anchorX, anchorY, displayX: anchorX, displayY: anchorY, velocityX: 0, velocityY: 0 });
				}
			}
			dotsRef.current = dots;
		};

		const resize = () => {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(() => {
				const rect = canvas.parentElement.getBoundingClientRect();
				canvas.width = Math.max(1, Math.round(rect.width * dpr));
				canvas.height = Math.max(1, Math.round(rect.height * dpr));
				canvas.style.width = `${rect.width}px`;
				canvas.style.height = `${rect.height}px`;
				context.setTransform(dpr, 0, 0, dpr, 0, 0);
				sizeRef.current = { height: rect.height, left: rect.left, top: rect.top, width: rect.width };
				buildDots(rect.width, rect.height);
			}, 80);
		};

		const updatePointer = (event) => {
			const size = sizeRef.current;
			pointerRef.current.x = event.clientX - size.left;
			pointerRef.current.y = event.clientY - size.top;
		};

		const updatePointerSpeed = () => {
			const pointer = pointerRef.current;
			const deltaX = pointer.previousX - pointer.x;
			const deltaY = pointer.previousY - pointer.y;
			const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			pointer.speed += (distance - pointer.speed) * 0.5;
			if (pointer.speed < 0.001) pointer.speed = 0;
			pointer.previousX = pointer.x;
			pointer.previousY = pointer.y;
		};

		const speedInterval = window.setInterval(updatePointerSpeed, 20);

		const draw = () => {
			frameCount += 1;
			const dots = dotsRef.current;
			const pointer = pointerRef.current;
			const settings = propsRef.current;
			const { height, width } = sizeRef.current;
			const time = frameCount * 0.02;
			const targetEngagement = Math.min(pointer.speed / 5, 1);

			engagementRef.current += (targetEngagement - engagementRef.current) * 0.06;
			glowOpacityRef.current += (engagementRef.current - glowOpacityRef.current) * 0.08;

			if (glowRef.current) {
				glowRef.current.setAttribute("cx", pointer.x);
				glowRef.current.setAttribute("cy", pointer.y);
				glowRef.current.style.opacity = glowOpacityRef.current;
			}

			context.clearRect(0, 0, width, height);
			const gradient = context.createLinearGradient(0, 0, width, height);
			gradient.addColorStop(0, settings.gradientFrom);
			gradient.addColorStop(1, settings.gradientTo);
			context.fillStyle = gradient;
			context.beginPath();

			const radius = settings.dotRadius / 2;
			const cursorRadiusSquared = settings.cursorRadius ** 2;

			dots.forEach((dot, index) => {
				const deltaX = pointer.x - dot.anchorX;
				const deltaY = pointer.y - dot.anchorY;
				const distanceSquared = deltaX * deltaX + deltaY * deltaY;

				if (distanceSquared < cursorRadiusSquared && engagementRef.current > 0.01) {
					const distance = Math.max(Math.sqrt(distanceSquared), 1);
					const angle = Math.atan2(deltaY, deltaX);
					if (settings.bulgeOnly) {
						const falloff = 1 - distance / settings.cursorRadius;
						const push = falloff * falloff * settings.bulgeStrength * engagementRef.current;
						dot.displayX += (dot.anchorX - Math.cos(angle) * push - dot.displayX) * 0.15;
						dot.displayY += (dot.anchorY - Math.sin(angle) * push - dot.displayY) * 0.15;
					} else {
						const movement = (500 / distance) * (pointer.speed * settings.cursorForce);
						dot.velocityX -= Math.cos(angle) * movement;
						dot.velocityY -= Math.sin(angle) * movement;
					}
				}

				if (!settings.bulgeOnly) {
					dot.velocityX *= 0.9;
					dot.velocityY *= 0.9;
					dot.displayX += (dot.anchorX + dot.velocityX - dot.displayX) * 0.1;
					dot.displayY += (dot.anchorY + dot.velocityY - dot.displayY) * 0.1;
				} else if (distanceSquared >= cursorRadiusSquared) {
					dot.displayX += (dot.anchorX - dot.displayX) * 0.1;
					dot.displayY += (dot.anchorY - dot.displayY) * 0.1;
				}

				let x = dot.displayX;
				let y = dot.displayY;
				if (settings.waveAmplitude > 0) {
					y += Math.sin(dot.anchorX * 0.03 + time) * settings.waveAmplitude;
					x += Math.cos(dot.anchorY * 0.03 + time * 0.7) * settings.waveAmplitude * 0.5;
				}

				const sparkleScale = settings.sparkle && ((index * 2654435761) ^ (frameCount >> 3)) % 100 < 3 ? 1.8 : 1;
				context.moveTo(x + radius * sparkleScale, y);
				context.arc(x, y, radius * sparkleScale, 0, TWO_PI);
			});

			context.fill();
			frameRef.current = window.requestAnimationFrame(draw);
		};

		resize();
		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", updatePointer, { passive: true });
		frameRef.current = window.requestAnimationFrame(draw);
		rebuildRef.current = () => buildDots(sizeRef.current.width, sizeRef.current.height);

		return () => {
			window.cancelAnimationFrame(frameRef.current);
			window.clearInterval(speedInterval);
			window.clearTimeout(resizeTimer);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", updatePointer);
		};
	}, []);

	useEffect(() => rebuildRef.current?.(), [dotRadius, dotSpacing]);

	return (
		<div className={`dot-field-container ${className}`}>
			<canvas aria-hidden="true" ref={canvasRef} />
			<svg aria-hidden="true">
				<defs>
					<radialGradient id={glowIdRef.current}>
						<stop offset="0%" stopColor={glowColor} />
						<stop offset="100%" stopColor="transparent" />
					</radialGradient>
				</defs>
				<circle cx="-9999" cy="-9999" fill={`url(#${glowIdRef.current})`} r={glowRadius} ref={glowRef} />
			</svg>
		</div>
	);
});

DotField.displayName = "DotField";

export default DotField;
