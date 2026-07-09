import { useEffect } from "react";

const SmoothScroll = () => {
	useEffect(() => {
		if (process.env.NODE_ENV === "test") {
			return undefined;
		}

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		if (reduceMotion) {
			return undefined;
		}

		let frameId;
		let lenis;
		let isMounted = true;

		import("lenis").then(({ default: Lenis }) => {
			if (!isMounted) {
				return;
			}

			lenis = new Lenis({
				duration: 1.05,
				smoothWheel: true,
				touchMultiplier: 1.1,
			});

			const raf = (time) => {
				lenis.raf(time);
				frameId = requestAnimationFrame(raf);
			};

			frameId = requestAnimationFrame(raf);
		});

		return () => {
			isMounted = false;

			if (frameId) {
				cancelAnimationFrame(frameId);
			}

			if (lenis) {
				lenis.destroy();
			}
		};
	}, []);

	return null;
};

export default SmoothScroll;
