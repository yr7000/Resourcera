import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import useStyles from "./styles";
import bulbImage from "../../images/R.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

export default function Navbar() {
	const classes = useStyles();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let token;
		if (user) token = user.token;
		if (token) {
			try {
				const decodedToken = decode(token);
				if (decodedToken.exp * 1000 < new Date().getTime()) logout();
			} catch (error) {
				console.log(error);
			}
		}
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const logout = () => {
		dispatch({ type: "logout" });
		navigate("/auth");
		setUser(null);
	};

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<div className={classes.brandContainer}>
				<Typography className={classes.heading} component={Link} to="/" variant="h4" align="center">
					Resourcera
				</Typography>
				<img className={classes.image} src={bulbImage} alt="resourcera" height="45" />
			</div>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.result.name}
						</Typography>
						<Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
							Logout
						</Button>
					</div>
				) : (
					<Button href="/auth" variant="contained" color="primary">
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
}
