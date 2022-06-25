import React, { useState } from 'react';
import './Card.css';
import axios from 'axios';

function Card(props) {
	const handleApproved = async (e, content) => {
		const response = await axios
			.post('http://localhost:5000/api/admin/approve', content)
			.then((res) => res);
		if (response.msg === 'Sucess') {
			window.location.reload();
		}
	};

	const handleDelete = async (e, content) => {
		const response = await axios.post(
			'http://localhost:5000/api/admin/deletequote',
			content
		);
	};

	const eachCard = props.cardContent.map((content, id) => (
		<div key={content.id} class='card shadow mt-5 w-75 mx-auto'>
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

			{props.approve === 'Approve' ? (
				<button
					class='btn-sm w-0 mx-auto me-2 mb-2 btn btn-primary'
					onClick={(e) => handleApproved(e, content)}>
					Approve
				</button>
			) : (
				<>
					<button
						class='btn-sm w-0 mx-auto me-2 mb-2 btn btn-danger'
						onClick={(e) => handleDelete(e, content)}>
						Delete
					</button>
					{/* <button
						type='button'
						class='btn-sm mx-auto me-2 mb-2 btn btn-danger'
						data-bs-toggle='modal'
						data-bs-target='#staticBackdrop'>
						Delete{' '}
					</button> */}

					{/* <div
						class='modal fade'
						id='staticBackdrop'
						data-bs-backdrop='static'
						data-bs-keyboard='false'
						tabindex='-1'
						aria-labelledby='staticBackdropLabel'
						aria-hidden='true'>
						<div class='modal-dialog'>
							<div class='modal-content'>
								<div class='modal-header'>
									<h5
										class='modal-title'
										id='staticBackdropLabel'>
										Delete Quote
									</h5>
									<button
										type='button'
										class='btn-close'
										data-bs-dismiss='modal'
										aria-label='Close'></button>
								</div>
								<div class='modal-body'>
									Are you sure you want to delete?
								</div>
								<div class='modal-footer'>
									<button
										type='button'
										class='btn btn-secondary'
										data-bs-dismiss='modal'>
										Close
									</button>
									<button
										onClick={(e) =>
											handleDelete(e, content)
										}
										type='button'
										class='btn btn-danger'>
										Yes, Delete
									</button>
								</div>
							</div>
						</div>
					</div> */}
				</>
			)}
		</div>
	));

	return <div>{eachCard}</div>;
}

export default Card;
