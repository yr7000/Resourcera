// files in the controller will have the handlers(functions)

// importing the model
// while using a file path in node js dont forget to mention js extension for a file
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	try {
		// finding the posts is a time taking process so we use async await
		const postMessages = await PostMessage.find();
		// after recieving the posts send a succress response
		res.status(200).json(postMessages);
	} catch (err) {
		// if an error is occured
		res.status(404).json({ message: err.message });
	}
};

export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;

	try {
		const title = new RegExp(searchQuery, "i");
		const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });
		if (posts.length) res.json({ data: posts });
		else res.status(404).json({ message: "No posts found" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;
	const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
	try {
		// saving a post may take time so use async await
		await newPost.save();
		res.status(201).json(newPost);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

export const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with that id");
	const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id: _id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with that id");
	await PostMessage.findByIdAndRemove(_id);
	res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
	const { id: _id } = req.params;
	if (!req.userId) return res.json({ message: "not authenticated" });
	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with that id");
	const post = await PostMessage.findById(_id);
	const index = post.likes.findIndex((id) => id === String(req.userId));

	if (index === -1) {
		post.likes.push(req.userId);
	} else {
		post.likes = post.likes.filter((id) => id !== String(req.userId));
	}
	const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: "true" });
	res.json(updatedPost);
};
