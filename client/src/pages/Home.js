import React, { useState } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';

function Home() {
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
			<Card up={handleUpvote} down={handleDownvote} votes={upvote} />;
		</>
	);
}

export default Home;
