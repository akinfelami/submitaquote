import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
	return (
		<nav
			class='navbar navbar-expand-lg navbar-dark bg-dark'
			aria-label='Ninth navbar example'>
			<div class='container ms-auto p-1'>
				<Link class='navbar-brand' to='/'>
					Submit a Quote
				</Link>
				<button
					class='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarsExample07XL'
					aria-controls='navbarsExample07XL'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span class='navbar-toggler-icon'></span>
				</button>
				<div class='collapse navbar-collapse' id='navbarsExample07XL'>
					<ul class='navbar-nav me-auto mb-2 mb-lg-0'>
						<li class='nav-item'>
							<Link
								class='nav-link active me-5'
								aria-current='page'
								to='/new'>
								<button
									type='button'
									class='btn btn-secondary btn-sm'>
									Submit a Quote
								</button>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
