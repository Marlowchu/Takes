const post = document.querySelector('.textBox');
const postBtn = document.querySelector('.addPostBtn');
const onDashboard = document.querySelector('.postList');

const postDetails = () => {
	const post = document.querySelector('.textBox').value.trim();

	return post;
};

post.addEventListener('keypress', postDetails);

postBtn.addEventListener('click', async (e) => {
	e.preventDefault
	const description = document.querySelector('.textBox').value.trim();
	const title = document.querySelector('.titleBox').value.trim();

	setTimeout(() => {console.log("this is the second message")}, 3000)
	 
	if (description && title) {
		const response = await fetch('/api/users/post', {
			method: 'POST',
			body: JSON.stringify({ title, description }),
			headers: { 'Content-Type': 'application/json' },
		}).then(() => {
			document.querySelector('.textBox').value = '';
			document.querySelector('.titleBox').value = '';
			setTimeout(() => {
				window.location.reload();
			}, 2000) 
		});

		console.log(response);
	}

	const clearIt = () => {
		console.log('ran');
		document.querySelector('.textBox').value = '';
		document.querySelector('.titleBox').value = '';
	};
});

// Function to fetch all post and send them to the Dom.

// fetch(`api/users/post`)
// 	.then((response) => response.json())
// 	.then((data) => {
// 		for (i = 0; i < data; i++) {}
// 		const thePost = data.map(
// 			(allPost) => `<li class="newPost">
//         ${allPost.title}\n <div class="theDescription">${allPost.description}</div> 
//         </li>`
// 		);
// 		return (onDashboard.innerHTML = thePost.reverse());
// 	});
