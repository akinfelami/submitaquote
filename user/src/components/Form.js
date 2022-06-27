import React from 'react';

function Form() {
	return (
		<form
			onsubmit='return false'
			class='w-75 mx-auto mt-5'
			method='POST'
			action='/api/newquote'>
			<div>
				<div class='mb-3'>
					<label for='exampleFormControlInput1' class='form-label'>
						Author
					</label>
					<input
						type='text'
						class='form-control'
						id='author'
						name='author'
						placeholder='Enter quote author'
						required
					/>
				</div>
				<div class='mb-3'>
					<label for='exampleFormControlInput1' class='form-label'>
						Source
					</label>
					<input
						type='text'
						name='source'
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
						type='text'
						name='name'
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
						class='form-control'
						id='quote'
						name='quote'
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
