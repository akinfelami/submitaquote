import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Form() {
	const navigate = useNavigate();
	const [author, setAuthor] = useState('');
	const [source, setSource] = useState('');
	const [name, setName] = useState('');
	const [quote, setQuote] = useState('');
	const [data, setData] = useState('');
	const [response, setResponse] = useState('');
	const [time, setTime] = useState(5);

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function navigateTo(res) {
		for (let i = 5; i > 0; i--) {
			setTime(i);
			await sleep(1000);
		}
		navigate('/');
	}

	const handleAuthor = (e) => {
		e.preventDefault();
		setAuthor(e.target.value);
	};

	const handleSource = (e) => {
		e.preventDefault();
		setSource(e.target.value);
	};

	const handleName = (e) => {
		e.preventDefault();
		setName(e.target.value);
	};

	const handleQuote = (e) => {
		e.preventDefault();
		setQuote(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setData({
			author: author,
			source: source,
			name: name,
			quote: quote,
		});
		const response = await axios
			.post('http://localhost:5000/api/newquote', data)
			.then((res) => setResponse(res.msg));

		navigateTo(response);
	};

	return (
		<>
			{response === '' ? (
				<form class='w-75 mx-auto mt-5' onSubmit={handleSubmit}>
					<div>
						<div class='mb-3'>
							<label
								for='exampleFormControlInput1'
								class='form-label'>
								Author
							</label>
							<input
								onChange={handleAuthor}
								type='text'
								class='form-control'
								id='author'
								placeholder='Enter quote author'
								required
							/>
						</div>
						<div class='mb-3'>
							<label
								for='exampleFormControlInput1'
								class='form-label'>
								Source
							</label>
							<input
								onChange={handleSource}
								type='text'
								class='form-control'
								id='source'
								placeholder='Enter your source'
								required
							/>
						</div>
						<div class='mb-3'>
							<label
								for='exampleFormControlInput1'
								class='form-label'>
								Your name - for credit
							</label>
							<input
								onChange={handleName}
								type='text'
								class='form-control'
								id='name'
								placeholder='Enter your name'
								required
							/>
						</div>
						<div class='mb-3'>
							<label
								for='exampleFormControlTextarea1'
								class='form-label'>
								Quote
							</label>
							<textarea
								onChange={handleQuote}
								class='form-control'
								id='quote'
								rows='4'
								required
							/>
						</div>

						<button type='submit' class='btn btn-primary'>
							Submit for approval
						</button>
					</div>
				</form>
			) : (
				<div class='text-center mt-5 fs-1'>
					<p>
						{' '}
						Thank you for submitting a quote. Your response has been
						received and is under review.
						<p>Redirecting in {time}s...</p>
					</p>
				</div>
			)}
		</>
	);
}

export default Form;
