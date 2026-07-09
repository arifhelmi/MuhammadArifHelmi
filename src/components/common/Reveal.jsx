import React, { useEffect, useRef, useState } from "react";

const Reveal = (props) => {
	const {
		as: Component = "div",
		children,
		className = "",
		delay = 0,
		style,
		...rest
	} = props;
	const elementRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const element = elementRef.current;

		if (!element) {
			return undefined;
		}

		if (
			process.env.NODE_ENV === "test" ||
			typeof window.matchMedia !== "function" ||
			typeof IntersectionObserver === "undefined"
		) {
			setIsVisible(true);
			return undefined;
		}

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		if (reduceMotion) {
			setIsVisible(true);
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{
				rootMargin: "0px 0px -8% 0px",
				threshold: 0.16,
			}
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	return (
		<Component
			{...rest}
			ref={elementRef}
			className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
			style={{ ...style, "--reveal-delay": `${delay}ms` }}
		>
			{children}
		</Component>
	);
};

export default Reveal;
