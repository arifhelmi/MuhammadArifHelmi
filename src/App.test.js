import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

test("renders the portfolio homepage", () => {
	render(
		<BrowserRouter
			future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
		>
			<App />
		</BrowserRouter>
	);

	expect(
		screen.getByRole("heading", {
			level: 1,
			name: /Muhammad Arif Helmi/i,
		})
	).toBeInTheDocument();
	expect(
		screen.getByRole("navigation", { name: /main navigation/i })
	).toBeInTheDocument();
});
