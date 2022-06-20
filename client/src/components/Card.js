import React from 'react';
import './Card.css';
import { data } from './test.js';

function Card(props) {
	const eachCard = data.map((datum, idx) => (
		<div key={idx} class='card shadow mt-5 w-75 mx-auto'>
			<div class='card-header'>Submitted by {datum.name} </div>
			<div class='d-flex flex-row'>
				<div class='d-flex flex-column p-3 justify-content-center'>
					<div class='mb-2'>
						<button class='button' onClick={props.up}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='25'
								height='25'
								fill='currentColor'
								class='bi bi-arrow-up-short'
								viewBox='0 0 16 16'>
								<path
									fill-rule='evenodd'
									d='M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z'
								/>
							</svg>
						</button>
					</div>
					<button class='counts'> {props.votes} </button>
					<div class='mt-2'>
						<button class='button' onClick={props.down}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='25'
								height='25'
								fill='currentColor'
								class='bi bi-arrow-down-short'
								viewBox='0 0 16 16'>
								<path
									fill-rule='evenodd'
									d='M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z'
								/>
							</svg>
						</button>
					</div>
				</div>
				<div class='card-body mt-2'>
					<blockquote class='blockquote mb-0'>
						<p class='fs-6 align-items-center'>{datum.quote}</p>
						<footer class='blockquote-footer mt-2'>
							{datum.author} in{' '}
							<cite title='Source Title'>{datum.source}</cite>
						</footer>
					</blockquote>
				</div>{' '}
			</div>
		</div>
	));

	return <div>{eachCard};</div>;
}

export default Card;
