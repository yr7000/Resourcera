import React from "react";
import useStyles from "./styles";
import moment from "moment";
import { useDispatch } from "react-redux";
import Link from "@material-ui/core/Link";

import { deletePost, likePost } from "../../../actions/posts";

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export default function Post({ post, setCurrentId }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));
	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find((like) => like === ((user && user.result && user.result.id) || (user && user.result && user.result._id))) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize="small" />
					&nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
				</>
			);
		}

		return (
			<>
				<ThumbUpAltOutlined fontSize="small" />
				&nbsp;Like
			</>
		);
	};

	return (
		<Card className={classes.card} raised elevation={6}>
			<CardMedia className={classes.media} image={post.selectedFile} title={post.title} component="div" />
			<div className={classes.overlay}>
				<Typography variant="h6">{post.name}</Typography>
				<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
			</div>
			{((user && user.result && user.result.id === post.creator) || (user && user.result && user.result._id === post.creator)) && (
				<div className={classes.overlay2}>
					<Button
						style={{ color: "white" }}
						size="small"
						onClick={() => {
							setCurrentId(post._id);
						}}
					>
						<MoreHorizIcon fontSize="medium" />
					</Button>
				</div>
			)}
			<div className={classes.details}>
				<Typography variant="body2" color="textSecondary">
					{post.tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<Typography className={classes.title} variant="h5" gutterBottom>
				{post.title}
			</Typography>
			<CardContent>
				<Typography variant="body2" gutterBottom>
					{post.message}
				</Typography>
			</CardContent>
			<Link className={classes.link} href={post.resourceLink} gutterBottom>
				Resource Link
			</Link>
			<CardActions className={classes.cardActions}>
				<Button
					size="small"
					color="primary"
					disabled={!user}
					onClick={() => {
						dispatch(likePost(post._id));
					}}
				>
					<Likes />
				</Button>
				{((user && user.result && user.result.id === post.creator) || (user && user.result && user.result._id === post.creator)) && (
					<Button
						size="small"
						color="primary"
						onClick={() => {
							dispatch(deletePost(post._id));
						}}
					>
						<DeleteIcon fontSize="small"></DeleteIcon>
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
}
