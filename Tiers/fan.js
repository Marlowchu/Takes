
class Fan  {
    getRole(){
        return 'Fan'
    }
    getImage(){
        return 
    }
}

function showImage(scr, width, height, alt){
    var img = document.createElement('img');
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    document.body.appendChild(img);
}

// showImage();




// class Fan {
//     constructor(totalPoints) {
//         this.totalPoints = <2 && >0;
//     } 

//     setRole (role) {
//         this.role =role;
//     }
//     getRole () { 
//         return 'you are a fan'
//     }  
// }

// class Ranking {
//     constructor(role){
//         this.role = role;
//     }
    
//     getRole(){
//         return this.role;
//     }
// }
module.exports = Fan;