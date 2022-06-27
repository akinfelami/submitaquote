import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function Card({ currentItems }) {
	let styles = 'card shadow mt-5 w-50 mx-auto';
	let mediaQuery = window.matchMedia('(max-width: 780px)');
	if (mediaQuery.matches) {
		styles = 'card shadow mt-5 w-75 mx-auto';
	}

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
				</div>
			</div>
		</div>
	));
	return <div>{eachCard}</div>;
}

function PaginatedItems({ itemsPerPage, cardContent }) {
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
			<Card currentItems={currentItems} />
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
