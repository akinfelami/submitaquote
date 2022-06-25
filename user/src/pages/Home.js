import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';

function Home() {
	const [content, setContent] = useState([]);
	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					'http://localhost:5000/api/quotes'
				);
				const result = await response.json();
				setContent(result);
				console.log(result);
			} catch (err) {
				console.error(err);
			}
		};
		getData();
	}, []);
	const searchBar = (
		<form role='search'>
			<input class='form-control-sm' type='search' placeholder='Search' />
		</form>
	);

	const [upvote, setUpvote] = useState(0);

	const handleUpvote = () => {
		setUpvote(upvote + 1);
	};

	const handleDownvote = () => {
		setUpvote(upvote - 1);
	};

	return (
		<>
			<Navbar search={searchBar} />
			<Card
				up={handleUpvote}
				down={handleDownvote}
				votes={upvote}
				cardContent={content}
			/>
		</>
	);
}

export default Home;
