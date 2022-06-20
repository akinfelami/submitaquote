import React, { useState } from 'react';

function Form() {
	const [author, setAuthor] = useState('');
	const [source, setSource] = useState('');
	const [name, setName] = useState('');
	const [quote, setQuote] = useState('');

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

	const handleSubmit = (e) => {
		// e.preventDefault();
		console.log(author);
		console.log(source);
		console.log(name);
		console.log(quote);
	};

	return (
		<form class='w-75 mx-auto mt-5' onSubmit={handleSubmit}>
			<div>
				<div class='mb-3'>
					<label for='exampleFormControlInput1' class='form-label'>
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
					<label for='exampleFormControlInput1' class='form-label'>
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
					<label for='exampleFormControlInput1' class='form-label'>
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
					<label for='exampleFormControlTextarea1' class='form-label'>
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
	);
}

export default Form;
