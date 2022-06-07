import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./input";
import useStyles from "./styles";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import axios from "axios";

const initialData = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export default function Auth() {
	const classes = useStyles();
	const [isSignUp, setIsSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState(initialData);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

	const switchMode = () => {
		setIsSignUp((prev) => !prev);
		setShowPassword(false);
	};

	const login = useGoogleLogin({
		onSuccess: async (res) => {
			const token = res.access_token;
			const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`);
			const result = userInfo.data;
			try {
				dispatch({ type: "auth", data: { result, token } });
				navigate("/");
			} catch (err) {
				console.log(err);
			}
		},
		onError: (error) => {
			console.log("failure ", error);
		},
	});

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
								<Input name="lastName" label="Last Name" handleChange={handleChange} half />
							</>
						)}
						<Input name="email" label="Email" handleChange={handleChange} type="email" />
						<Input
							name="password"
							label="password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						{isSignUp ? "Sign Up" : "Sign In"}
					</Button>
					<Button
						className={classes.googleButton}
						color="primary"
						fullWidth
						onClick={() => login()}
						startIcon={<Icon />}
						variant="contained"
					>
						Google Sign In
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Button onClick={switchMode} variant="contained" color="secondary">
								{isSignUp ? "Already have an account? Sign In" : "Dont have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
}
