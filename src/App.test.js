import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

test("renders the portfolio homepage", () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);

	expect(
		screen.getByRole("heading", {
			name: /I build reliable systems for products/i,
		})
	).toBeInTheDocument();
	expect(screen.getByRole("navigation")).toBeInTheDocument();
});
