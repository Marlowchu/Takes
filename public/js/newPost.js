const post = document.querySelector('.textBox');
const postBtn = document.querySelector('.addPostBtn')

const postDetails = () => {
    const post = document.querySelector('.textBox').value.trim();

    return post
};

post.addEventListener('keypress', postDetails)

postBtn.addEventListener('click', async () => {
    const description = document.querySelector('.textBox').value.trim();
    const title = document.querySelector('.titleBox').value.trim();
    if (description && title) {
        const response = await fetch('/api/users/post', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(() => {
            document.querySelector('.textBox').value = ""
            document.querySelector('.titleBox').value = ""
        })
        
        console.log(response)
    }
   
    const clearIt = () => {
        console.log('ran')
        document.querySelector('.textBox').value = ""
        document.querySelector('.titleBox').value = ""

    }
})

// post.innerText = 