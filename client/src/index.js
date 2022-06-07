import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import posts from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { GoogleOAuthProvider } from "@react-oauth/google";
const store = configureStore({ reducer: posts });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<GoogleOAuthProvider clientId="670554364495-elr2g8r9ku2a3lds6f9074lsnonfv7e1.apps.googleusercontent.com">
		<Provider store={store}>
			<App />
		</Provider>
	</GoogleOAuthProvider>
);
