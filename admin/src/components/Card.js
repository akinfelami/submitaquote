import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Card({ currentItems, approve, status }) {
	let styles = 'card shadow mt-5 w-50 mx-auto';
	let mediaQuery = window.matchMedia('(max-width: 780px)');
	if (mediaQuery.matches) {
		styles = 'card shadow mt-5 w-75 mx-auto';
	}
	const handleApproved = (e, content) => {
		axios
			.post('http://localhost:5000/api/admin/approve', content)
			.then((res) => window.location.reload())
			.catch((err) => console.log(err));
	};

	const handleDelete = (e, content) => {
		if (status === 'decline') {
			axios
				.post('http://localhost:5000/api/admin/deletedeclined', content)
				.then((res) => window.location.reload());
		} else {
			axios
				.post('http://localhost:5000/api/admin/deletequote', content)
				.then((res) => window.location.reload())
				.catch((err) => console.log(err));
		}
	};

	const handleDecline = (e, content) => {
		axios
			.post('http://localhost:5000/api/admin/declinequote', content)
			.then((res) => window.location.reload())
			.catch((err) => console.log(err));
	};

	const eachCard = currentItems.map((content, id) => (
		<div key={content.id} class={styles}>
			<div class='card-header'>Submitted by {content.name} </div>
			<div class='d-flex flex-row'>
				<div class='d-flex flex-column p-3 justify-content-center'></div>
				<div class='card-body mt-2'>
					<blockquote class='blockquote mb-0'>
						<p class='fs-6 align-items-center'>{content.quote}</p>
						<footer class='blockquote-footer mt-2'>
							{content.author} in{' '}
							<cite title='Source Title'>{content.source}</cite>
						</footer>
					</blockquote>
				</div>{' '}
			</div>

			{approve === 'Approve' ? (
				<div class='d-flex gap-3 mx-auto me-2 mb-2'>
					<button
						type='submit'
						class='btn-sm btn btn-danger'
						onClick={(e) => handleDecline(e, content)}>
						Decline
					</button>
					<button
						type='submit'
						class='btn-sm btn btn-primary'
						onClick={(e) => handleApproved(e, content)}>
						Approve
					</button>
				</div>
			) : (
				<>
					<button
						type='submit'
						class='btn-sm w-0 mx-auto me-2 mb-2 btn btn-danger'
						onClick={(e) => handleDelete(e, content)}>
						Delete
					</button>
				</>
			)}
		</div>
	));

	return <div>{eachCard}</div>;
}
function PaginatedItems({ itemsPerPage, cardContent, approve, status }) {
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);

	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(cardContent.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(cardContent.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, cardContent]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % cardContent.length;
		setItemOffset(newOffset);
	};

	return (
		<>
			<Card
				currentItems={currentItems}
				approve={approve}
				status={status}
			/>
			<nav aria-label='...' class='mt-5'>
				<ReactPaginate
					breakLabel='...'
					nextLabel='next'
					breakClassName='page-item'
					breakLinkClassName='page-link'
					containerClassName='pagination justify-content-center'
					pageClassName='page-item'
					pageLinkClassName='page-link'
					previousClassName='page-item'
					previousLinkClassName='page-link'
					nextClassName='page-item'
					nextLinkClassName='page-link'
					activeClassName='active'
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel='previous'
					renderOnZeroPageCount={null}
				/>
			</nav>
		</>
	);
}

export default PaginatedItems;
