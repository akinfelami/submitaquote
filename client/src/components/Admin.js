import React, { useState } from 'react';
import './Admin.css';
import axios from 'axios';

function Admin() {
	return (
		<div className='Auth-form-container'>
			<form
				action='http://localhost:5000/api/admin'
				method='POST'
				className='Auth-form'>
				<div className='Auth-form-content'>
					<h3 className='Auth-form-title'>Sign In</h3>
					<div className='form-group mt-3'>
						<label>Username</label>
						<input
							name='username'
							type='text'
							className='form-control mt-1'
							placeholder='Enter username'
						/>
					</div>
					<div className='form-group mt-3'>
						<label>Password</label>
						<input
							name='password'
							type='password'
							className='form-control mt-1'
							placeholder='Enter password'
						/>
					</div>
					<div className='d-grid gap-2 mt-3'>
						<button type='submit' className='btn btn-primary'>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Admin;
