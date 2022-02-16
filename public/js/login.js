// const loginButton = document.getElementById('loginBtn');
const loginHandler = async (e) => {
	e.preventDefault();

	let email = document.querySelector('.loginEmail').value.trim();
	let password = document.querySelector('.loginPassword').value.trim();

	if (email && password) {
		const response = await fetch('api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Incorrect Email or Password');
		}
	}
};

// function hideSignUp() {
// 	console.log('click');
// 	// const loginForm = document.querySelector('.signup-form');
// 	// loginForm.setAttribute('class', '.hidden');
// }

document
.getElementById('login-form')
.addEventListener('submit', loginHandler);

// loginButton
// .getElementById('loginForm')
// .addEventListener('submit', loginFormHandler )
