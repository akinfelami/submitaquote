import React from 'react';
import './Card.css';

function Card(props) {
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
				</div>
			</div>
		</div>
	));

	return <div>{eachCard}</div>;
}

export default Card;
