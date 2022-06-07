import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email: email });
		if (!existingUser) return res.status(404).json({ message: "User not found" });
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
		if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect Password" });

		// if the user is valid get the users json web token
		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });
		return res.status(200).json({ result: existingUser, token: token });
	} catch (e) {
		res.status(500).json({ message: "Something went wrong. " });
	}
};

export const signup = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;
	try {
		const existingUser = await User.findOne({ email: email });
		if (existingUser) return res.status(400).json({ message: "User already exists" });
		if (password !== confirmPassword) return res.status(400).json({ message: "Password and confirm password must be the same" });
		// now hash the password
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({ email: email, password: hashedPassword, name: `${firstName} ${lastName}` });
		const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });
		return res.status(200).json({ result: result, token: token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong. " });
	}
};
