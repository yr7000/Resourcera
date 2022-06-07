import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";

const App = () => {
	const user = JSON.parse(localStorage.getItem("profile"));
	return (
		<BrowserRouter>
			<Container maxWidth="lg">
				<Navbar />
				<Routes>
					<Route exact path="/posts" element={<Home />} />
					<Route exact path="/posts/search" element={<Home />} />
					{!user && <Route exact path="/auth" element={<Auth />} />}
					<Route exact path="/" element={<Navigate replace to="/posts" />} />
					{user && <Route exact path="/auth" element={<Navigate to="/posts" />} />}
				</Routes>
			</Container>
		</BrowserRouter>
	);
};

export default App;
