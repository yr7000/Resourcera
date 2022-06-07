import React from "react";
import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

export default function Form({ currentId, setCurrentId }) {
	const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));
	const [postData, setPostData] = useState({
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
		resourceLink: "",
	});

	const clear = () => {
		setPostData({
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
			resourceLink: "",
		});
		setCurrentId(null);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(updatePost(currentId, { ...postData, name: user.result.name }));
		} else {
			dispatch(createPost({ ...postData, name: user.result.name }));
		}
		clear();
	};

	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]);

	if (!user || !user.result || !user.result.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" alignitems="center">
					Please Sign In to create your own resources and to like other's resources.
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper}>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<Typography variant="h6">{currentId ? "Edit" : "Post"} Resource</Typography>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					multiline
					minRows={4}
					value={postData.message}
					onChange={(e) => setPostData({ ...postData, message: e.target.value })}
				/>
				<TextField
					name="Link"
					variant="outlined"
					label="Link (if any)"
					fullWidth
					multiline
					value={postData.resourceLink}
					onChange={(e) => setPostData({ ...postData, resourceLink: e.target.value })}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags (, separated)"
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({
							...postData,
							tags: e.target.value.split(","),
						})
					}
				/>
				<div className={classes.fileInput}>
					<FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
				</div>
				<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
					Submit
				</Button>
				<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
					Clear
				</Button>
			</form>
		</Paper>
	);
}
