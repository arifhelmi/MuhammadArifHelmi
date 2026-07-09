import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUpRightFromSquare,
	faCodeBranch,
	faLock,
} from "@fortawesome/free-solid-svg-icons";

import "./styles/project.css";

const Project = (props) => {
	const {
		category,
		description,
		index,
		link,
		linkText,
		stack = [],
		title,
	} = props;

	return (
		<React.Fragment>
			<article className="project">
				<div className="project-container">
					<div className="project-topline">
						<span className="project-index">
							{String(index + 1).padStart(2, "0")}
						</span>
						<span className="project-category">
							<FontAwesomeIcon icon={faCodeBranch} />
							{category}
						</span>
					</div>

					<h3 className="project-title">{title}</h3>
					<p className="project-description">{description}</p>

					{stack.length > 0 ? (
						<div className="project-stack" aria-label="Technology stack">
							{stack.map((item) => (
								<span className="project-stack-item" key={item}>
									{item}
								</span>
							))}
						</div>
					) : null}

					{link ? (
						<a
							className="project-link"
							href={link}
							target="_blank"
							rel="noreferrer"
						>
							<span>{linkText || "View project"}</span>
							<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
						</a>
					) : (
						<div className="project-link project-link-muted">
							<span>Private build</span>
							<FontAwesomeIcon icon={faLock} />
						</div>
					)}
				</div>
			</article>
		</React.Fragment>
	);
};

export default Project;
