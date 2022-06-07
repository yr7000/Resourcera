import * as api from "../api";
import { fetchBySearch, fetchAll, create, Delete, update, like } from "../constants/actionTypes";
export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: fetchAll, payload: data });
	} catch (err) {
		console.log(err.message);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);
		dispatch({ type: fetchBySearch, payload: data });
	} catch (error) {
		alert("No Posts found for search query");
		console.log(error);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);
		dispatch({ type: create, payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: update, payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: Delete, payload: id });
	} catch (err) {
		console.log(err);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: like, payload: data });
	} catch (err) {
		console.log(err);
	}
};
