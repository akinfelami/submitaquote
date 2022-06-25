import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

function ApprovedQuotes() {
	const [approved, setApproved] = useState([]);
	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					'http://localhost:5000/api/admin/quotesapproved'
				);
				const result = await response.json();
				console.log(result);
				setApproved(result);
			} catch (err) {
				console.error(err);
			}
		};
		getData();
	}, []);
	return (
		<div>
			<Card approve={'Delete'} cardContent={approved} />
		</div>
	);
}

export default ApprovedQuotes;
