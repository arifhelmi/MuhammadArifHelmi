import React, { useEffect, useRef } from "react";

import "./styles/ShapeGrid.css";

const ShapeGrid = ({
	direction = "down",
	speed = 0.47,
	borderColor = "#ffffff",
	squareSize = 54,
	hoverFillColor = "#65d6c7",
	hoverTrailAmount = 4,
	className = "",
}) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		if (typeof navigator !== "undefined" && navigator.userAgent.includes("jsdom")) {
			return undefined;
		}

		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (!canvas || !context) {
			return undefined;
		}

		const offset = { x: 0, y: 0 };
		const cellOpacities = new Map();
		const trail = [];
		let hoveredCell = null;
		let frameId;
		let width = 0;
		let height = 0;
		let dpr = 1;
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = Math.max(1, Math.round(width * dpr));
			canvas.height = Math.max(1, Math.round(height * dpr));
			context.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const updatePointer = (event) => {
			const rect = canvas.getBoundingClientRect();
			if (
				event.clientX < rect.left ||
				event.clientX > rect.right ||
				event.clientY < rect.top ||
				event.clientY > rect.bottom
			) {
				hoveredCell = null;
				return;
			}

			const localX = event.clientX - rect.left;
			const localY = event.clientY - rect.top;
			const normalizedX = ((offset.x % squareSize) + squareSize) % squareSize;
			const normalizedY = ((offset.y % squareSize) + squareSize) % squareSize;
			const nextCell = {
				x: Math.floor((localX - normalizedX) / squareSize),
				y: Math.floor((localY - normalizedY) / squareSize),
			};

			if (!hoveredCell || hoveredCell.x !== nextCell.x || hoveredCell.y !== nextCell.y) {
				if (hoveredCell && hoverTrailAmount > 0) {
					trail.unshift(hoveredCell);
					trail.length = Math.min(trail.length, hoverTrailAmount);
				}
				hoveredCell = nextCell;
			}
		};

		const updateCellOpacities = () => {
			const targets = new Map();
			if (hoveredCell) {
				targets.set(`${hoveredCell.x},${hoveredCell.y}`, 0.76);
			}
			trail.forEach((cell, index) => {
				targets.set(`${cell.x},${cell.y}`, (trail.length - index) / (trail.length + 2));
			});

			targets.forEach((value, key) => {
				if (!cellOpacities.has(key)) {
					cellOpacities.set(key, 0);
				}
			});

			cellOpacities.forEach((opacity, key) => {
				const target = targets.get(key) || 0;
				const nextOpacity = opacity + (target - opacity) * 0.14;
				if (nextOpacity < 0.005) {
					cellOpacities.delete(key);
				} else {
					cellOpacities.set(key, nextOpacity);
				}
			});
		};

		const draw = () => {
			context.clearRect(0, 0, width, height);
			const normalizedX = ((offset.x % squareSize) + squareSize) % squareSize;
			const normalizedY = ((offset.y % squareSize) + squareSize) % squareSize;
			const columns = Math.ceil(width / squareSize) + 3;
			const rows = Math.ceil(height / squareSize) + 3;

			context.lineWidth = 1;
			for (let column = -2; column < columns; column += 1) {
				for (let row = -2; row < rows; row += 1) {
					const x = column * squareSize + normalizedX;
					const y = row * squareSize + normalizedY;
					const opacity = cellOpacities.get(`${column},${row}`);

					if (opacity) {
						context.globalAlpha = opacity;
						context.fillStyle = hoverFillColor;
						context.fillRect(x, y, squareSize, squareSize);
						context.globalAlpha = 1;
					}

					context.strokeStyle = borderColor;
					context.strokeRect(x, y, squareSize, squareSize);
				}
			}
		};

		const animate = () => {
			const movement = reduceMotion ? 0 : Math.max(speed, 0);
			if (direction === "down") offset.y = (offset.y - movement + squareSize) % squareSize;
			if (direction === "up") offset.y = (offset.y + movement + squareSize) % squareSize;
			if (direction === "right") offset.x = (offset.x - movement + squareSize) % squareSize;
			if (direction === "left") offset.x = (offset.x + movement + squareSize) % squareSize;

			updateCellOpacities();
			draw();
			frameId = window.requestAnimationFrame(animate);
		};

		resize();
		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", updatePointer, { passive: true });
		frameId = window.requestAnimationFrame(animate);

		return () => {
			window.cancelAnimationFrame(frameId);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", updatePointer);
		};
	}, [borderColor, direction, hoverFillColor, hoverTrailAmount, speed, squareSize]);

	return <canvas aria-hidden="true" className={`shape-grid-canvas ${className}`} ref={canvasRef} />;
};

export default ShapeGrid;
