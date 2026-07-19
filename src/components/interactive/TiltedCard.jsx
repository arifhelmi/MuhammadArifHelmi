import React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import "./styles/TiltedCard.css";

const spring = {
	damping: 30,
	mass: 2,
	stiffness: 100,
};

const TiltedCard = ({
	children,
	scaleOnHover = 1.2,
	rotateAmplitude = 17,
	showTooltip = false,
	displayOverlayContent = false,
}) => {
	const reduceMotion = useReducedMotion();
	const rotateX = useSpring(useMotionValue(0), spring);
	const rotateY = useSpring(useMotionValue(0), spring);
	const scale = useSpring(1, spring);

	const handlePointerMove = (event) => {
		if (reduceMotion || event.pointerType === "touch") {
			return;
		}

		const rect = event.currentTarget.getBoundingClientRect();
		const offsetX = event.clientX - rect.left - rect.width / 2;
		const offsetY = event.clientY - rect.top - rect.height / 2;
		scale.set(scaleOnHover);
		rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
		rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
	};

	const reset = () => {
		rotateX.set(0);
		rotateY.set(0);
		scale.set(1);
	};

	return (
		<div
			className="tilted-card"
			onPointerEnter={(event) => {
				if (!reduceMotion && event.pointerType !== "touch") scale.set(scaleOnHover);
			}}
			onPointerLeave={reset}
			onPointerMove={handlePointerMove}
		>
			<motion.div className="tilted-card-inner" style={{ rotateX, rotateY, scale }}>
				{children}
				{showTooltip || displayOverlayContent ? null : null}
			</motion.div>
		</div>
	);
};

export default TiltedCard;
