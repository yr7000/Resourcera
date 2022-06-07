import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, AppBar, TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import { getPostsBySearch } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";

export default function Home() {
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();
	const classes = useStyles();
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [tags, setTags] = useState([]);

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	const handleKeypress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const handleAddChip = (tag) => setTags([...tags, tag]);

	const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

	const searchPost = () => {
		if (search.trim() || tags) {
			dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
			navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
		} else {
			navigate("/");
		}
	};

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid container className={classes.gridContainer} justifyContent="space-between" alignitems="stretch" spacing={3}>
					<Grid item xs={12} md={8}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} md={4}>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<TextField
								name="search"
								variant="outlined"
								label="Search Resources"
								onKeyPress={handleKeypress}
								fullWidth
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							></TextField>
							<ChipInput
								style={{ margin: "10px 0" }}
								value={tags}
								onAdd={(chip) => handleAddChip(chip)}
								onDelete={(chip) => handleDeleteChip(chip)}
								label="Search Tags"
								variant="outlined"
							/>
							<Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
}
