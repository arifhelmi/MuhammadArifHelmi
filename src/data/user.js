const INFO = {
	main: {
		title: "Muhammad Arif Helmi Portofolio",
		name: "Muhammad Arif Helmi",
		email: "helmio10394@gmail.com",
		logo: "../logo.png",
	},

	socials: {
		github: "https://github.com/arifhelmi",
		linkedin: "https://www.linkedin.com/in/muhammadarifhelmi/",
		cv: "/akbar-danial-akma-resume.pdf",
	},

	homepage: {
		eyebrow: "Backend-focused full-stack developer",
		title: "I build reliable systems for products that need to move fast.",
		description:
			"My name is Muhammad Arif Helmi. I specialize in Node.js, TypeScript, APIs, and product-minded backend architecture. I enjoy turning early ideas into dependable services, then shaping them with teams until they are ready for real users.",
		cta: "View Projects",
		secondaryCta: "Let's Talk",
	},

	about: {
		title: "I am Muhammad Arif Helmi, a Jakarta-based developer who cares about clean systems and useful products.",
		description:
			"I have worked across social, commerce, and community products, often from early planning through production. My strongest lane is backend development, but I like staying close to the full product so the technical decisions still serve the user experience.",
	},

	articles: {
		title: "I'm passionate about pushing the boundaries of what's possible and inspiring the next generation of innovators.",
		description:
			"Chronological collection of my long-form thoughts on programming, leadership, product design, and more.",
	},

	projects: [
		{
			title: "Tannoi Mobile App",
			category: "Social audio platform",
			description:
				"Built the backend foundation for a social media app on iOS and Android, enabling voice-based discussions and responses from concept to deployment.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			stack: ["Node.js", "TypeScript", "API Design", "Mobile Backend"],
			linkText: "View Project",
			link: null,
		},

		{
			title: "Nusa Commerce (Jakarta, Indonesia)",
			category: "Multi-channel commerce",
			description:
				"Developed backend capabilities for an e-commerce operations platform that helps sellers manage and synchronize multiple sales channels from one dashboard.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			stack: ["Node.js", "Integrations", "E-commerce", "Dashboards"],
			linkText: "View Project",
			link: "https://www.nusacommerce.com",
		},

		{
			title: "Fourz Mobile Apps",
			category: "Content ranking app",
			description:
				"Created backend services for an iOS app where users create, share, and rank content through a four-image format.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
			stack: ["Backend Services", "Content Models", "iOS Backend"],
			linkText: "View Project",
			link: null,
		},

		{
			title: "Wrga Mobile Apps (Jakarta, Indonesia)",
			category: "Neighborhood community",
			description:
				"Led backend development for an Android community app with posting, comments, likes, and neighborhood-focused content flows.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
			stack: ["Node.js", "Community Features", "Android Backend"],
			linkText: "View Project",
			link: null,
		},


		{
			title: "Muhammad Arif Helmi Portofolio Website (Jakarta, Indonesia)",
			category: "Personal website",
			description:
				"Designed and built a React portfolio that presents skills, experience, and selected work in a clear, fast, and responsive format.",
			stack: ["React", "CSS", "Responsive UI"],
			linkText: "View Project",
			link: null,
		},
	],

	highlights: [
		{
			value: "4+",
			label: "production apps",
		},
		{
			value: "Node.js",
			label: "main backend stack",
		},
		{
			value: "Jakarta",
			label: "open to remote teams",
		},
	],

	skills: [
		{
			title: "Backend",
			items: ["Node.js", "TypeScript", "REST APIs", "Auth", "Data modeling"],
		},
		{
			title: "Product Delivery",
			items: ["MVP planning", "Integrations", "Team collaboration", "Debugging"],
		},
		{
			title: "Frontend",
			items: ["React", "Responsive UI", "Design polish", "Performance basics"],
		},
	],

	principles: [
		"Start with the user flow, then shape the service around it.",
		"Keep APIs predictable, documented, and easy for teammates to trust.",
		"Build the smallest useful version, then improve it with real feedback.",
	],
};

export default INFO;
