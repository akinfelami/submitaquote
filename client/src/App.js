import logo from './logo.svg';
import './App.css';
// import React, { useEffect, useState } from 'react';

function App() {
	// Fetching from backend
	// const [dummy, setDummy] = useState('');

	// const fetchData = async (url) => {
	// 	const result = await fetch(url);
	// 	return result.json();
	// };

	// useEffect(() => {
	// 	async function updateData() {
	// 		const response = await fetchData('/');
	// 		setDummy(response);
	// 		console.log(response);
	// 	}
	// 	updateData();
	// }, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'></a>
				<button class='btn btn-secondary'>Learn React</button>
			</header>
		</div>
	);
}

export default App;
