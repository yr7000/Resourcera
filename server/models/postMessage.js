// files in model will deal with the data/database
import mongoose from "mongoose";

// create a schema (structure)
// structure of a post
const postSchema = mongoose.Schema({
	title: String,
	message: String,
	name: String,
	creator: String,
	resourceLink: String,
	tags: [String], // array of strings
	selectedFile: String,
	likes: {
		// if a property has multiple attributes
		type: [String],
		default: [],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

// convert a schema into a model(on which find create update delete can be called)
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
