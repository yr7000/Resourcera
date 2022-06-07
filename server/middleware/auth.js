import jwt from "jsonwebtoken";
import axios from "axios";
const secret = "test";

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length > 200;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, secret);
			req.userId = decodedData?.id;
		} else {
			const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`);
			const result = userInfo.data;
			req.userId = result.id;
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
