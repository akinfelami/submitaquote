import React, { useState, useEffect } from 'react';
import PaginatedItems from '../components/Card';

function ApprovedQuotes() {
	const [approved, setApproved] = useState([]);
	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					'http://localhost:5000/api/admin/quotesdeclined'
				);
				const result = await response.json();
				const content = result.map((item) => item).reverse();
				setApproved(content);
			} catch (err) {
				console.error(err);
			}
		};
		getData();
	}, []);
	return (
		<div>
			<PaginatedItems
				approve={'Delete'}
				cardContent={approved}
				status={'decline'}
				itemsPerPage={5}
			/>
		</div>
	);
}

export default ApprovedQuotes;
