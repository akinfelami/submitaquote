import React, { useState, useEffect } from 'react';
import PaginatedItems from '../components/Card';
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
				const content = result.map((item) => item).reverse();
				setContent(content);
			} catch (err) {
				console.error(err);
			}
		};
		getData();
	}, []);

	return (
		<>
			<Navbar />
			<PaginatedItems cardContent={content} itemsPerPage={5} />
		</>
	);
}

export default Home;
