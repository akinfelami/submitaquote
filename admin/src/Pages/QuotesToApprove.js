import React, { useState, useEffect } from 'react';
import PaginatedItems from '../components/Card';

function QuotesToApprove(props) {
	const [content, setContent] = useState([]);
	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					'http://localhost:5000/api/admin/quotes'
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
			<div>
				<PaginatedItems
					approve={'Approve'}
					cardContent={content}
					itemsPerPage={5}
				/>
			</div>
		</>
	);
}

export default QuotesToApprove;
