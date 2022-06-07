import React from "react";
import Post from "./Post/Post";

import { useSelector } from "react-redux";

import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";

export default function Posts({ setCurrentId }) {
	const posts = useSelector((state) => state.posts);
	const classes = useStyles();
	return !posts.length ? (
		<CircularProgress />
	) : (
		<Grid className={classes.container} container alignitems="stretch" spacing={3}>
			{posts.map((post) => (
				<Grid key={post._id} item xs={12} sm={6} md={6} lg={4}>
					<Post post={post} setCurrentId={setCurrentId} />
				</Grid>
			))}
		</Grid>
	);
}
