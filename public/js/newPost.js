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





const commentButtonHandler = async (event) => {
    
    const text = document.querySelector('.textBox').value.trim();

    if (event.target.hasAttribute('data-id')) {
        const take_id = event.target.getAttribute('data-id');
    
        
    
        const response = await fetch(`/api/users/comment`, {
          method: 'POST',
          body: JSON.stringify({ text, take_id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
            alert('success')
        } else {
          alert('Failed to add comment');
        }
      }
    };
    

    const likeButtonHandler = async (event) => {
    
        if (event.target.hasAttribute('data-id')) {
            const take_id = event.target.getAttribute('data-id');
        
            
        
            const response = await fetch("/api/users/pick", {
              method: 'POST',
              body: JSON.stringify({ take_id }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (response.ok) {
                alert('success')
            //   document.location.replace('/');
            } else {
              alert('Failed to add like');
            }
          }
        };

document
.querySelector('#commentbtn')
.addEventListener('click', commentButtonHandler);

document
.querySelector('#likebtn')
.addEventListener('click', likeButtonHandler);

// post.innerText = 