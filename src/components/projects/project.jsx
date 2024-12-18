import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import "./styles/project.css";

const Project = (props) => {
	const { title, description, link } = props;

	return (
		<React.Fragment>
			<div className="project">
				<div className="project-container">
					{/* <div className="project-logo">
						<img src={logo} alt="logo" />
					</div> */}
					<div className="project-title" style={{ color: 'black' }}>{title}</div>
					<div className="project-description" style={{ color: 'black' }}>{description}</div>
					{
						link !== null ? 
						<Link to={link} target="_blank">
							<div className="project-link">
								<div className="project-link-icon">
									<FontAwesomeIcon icon={faLink} />
								</div>

								<div className="project-link-text">{link}</div>
							</div>
						</Link> : <></>
					}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Project;
