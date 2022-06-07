import { fetchBySearch, fetchAll, create, Delete, update, like } from "../constants/actionTypes";
export default function posts(posts = [], action) {
	switch (action.type) {
		case fetchAll:
			return action.payload;
		case fetchBySearch:
			return action.payload;
		case create:
			return [...posts, action.payload];
		case update:
			return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
		case Delete:
			return posts.filter((post) => post._id !== action.payload);
		case like:
			return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
		default:
			return posts;
	}
}
