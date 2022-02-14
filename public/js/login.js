let theButton = document.querySelector('.btn');

const loginFormHandler = async (e) => {
	e.preventDefault();

	console.log('ran');

	const email = document.querySelector('.email-login').value.trim();
	const password = document.querySelector('.password-login').value.trim();

	if (email && password) {
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			header: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to login');
		}
	}
};

const signupFormHandler = async (e) => {
	e.preventDefault();

	const user_name = document.querySelector('.username').value.trim();
	const email = document.querySelector('.email').value.trim();
	const password = document.querySelector('.password').value.trim();

	if (user_name && email && password) {
		const response = await fetch('/api/users/register', {
			method: 'POST',
			body: JSON.stringify({ user_name, email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to sign up');
		}
	}
};

function hideSignUp() {
	const loginForm = document.querySelector('.signup-form');
	loginForm.setAttribute('class', '.hidden');
}

// theButton.addEventListener('click', hideSignUp)

document
	.querySelector('.signup-form')
	.addEventListener('submit', signupFormHandler);

document
	.querySelector('.login-form')
	.addEventListener('submit', loginFormHandler);
