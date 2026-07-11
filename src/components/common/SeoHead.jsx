import { useEffect } from "react";

const updateMeta = (attribute, key, content) => {
	let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

	if (!element) {
		element = document.createElement("meta");
		element.setAttribute(attribute, key);
		document.head.appendChild(element);
	}

	element.setAttribute("content", content);
};

const SeoHead = ({ title, description, keywords = [] }) => {
	useEffect(() => {
		document.title = title;
		updateMeta("name", "description", description);
		updateMeta("name", "keywords", keywords.join(", "));
		updateMeta("property", "og:title", title);
		updateMeta("property", "og:description", description);
		updateMeta("property", "og:type", "website");
		updateMeta("name", "twitter:card", "summary");
		updateMeta("name", "twitter:title", title);
		updateMeta("name", "twitter:description", description);
	}, [description, keywords, title]);

	return null;
};

export default SeoHead;
