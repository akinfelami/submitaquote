import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

function QuotesToApprove() {
	const [content, setContent] = useState([]);
	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					'http://localhost:5000/api/admin/quotes'
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
	return (
		<div>
			<Card approve={'Approve'} cardContent={content} />
		</div>
	);
}

export default QuotesToApprove;
