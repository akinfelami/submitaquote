import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar(props) {
	const handleLogout = async () => {
		await axios.get('http://localhost:5000/api/admin/logout');
		window.location.reload();
	};
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
								class='nav-link active'
								aria-current='page'
								to='/approvedquotes'>
								<button
									type='button'
									class='btn btn-secondary btn-sm'>
									See ApprovedQuotes
								</button>
							</Link>
						</li>
						<li class='nav-item'>
							<Link
								class='nav-link active'
								aria-current='page'
								to='/declinedquotes'>
								<button
									type='button'
									class='btn btn-secondary btn-sm'>
									See DeclinedQuotes
								</button>
							</Link>
						</li>
						<li class='nav-item'>
							<div
								class='nav-link active me-5'
								aria-current='page'>
								<button
									onClick={handleLogout}
									type='submit'
									class='btn btn-secondary btn-sm'>
									Log out
								</button>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
