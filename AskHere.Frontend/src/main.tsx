import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@styles/index.css";

import LoginPage from "@pages/LoginPage.tsx";
import HomePage from "@pages/HomePage.tsx";
import RegisterPage from "@pages/RegisterPage.tsx";
import { Provider } from "react-redux";
import { store } from "@services/store.ts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <LoginPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
		errorElement: <HomePage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
		errorElement: <HomePage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
