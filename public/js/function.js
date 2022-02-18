const btn = document.querySelector(".addbutton");
let count = 0;

btn.addEventListener("click", () => {
  count++;
  console.log(count);

  const target = document.querySelector(".hierarchyPics");

  

  switch (count) {
    case 1:
    case 2:
      console.log("Fan Ranking");
      image= `<img src="./img/fan_image.png">`
      
      target.innerHTML = image;
      // target= InnerHtml="<img>Icon</img>"
      break;
    case 3:
    case 4:
    // case 5:
      console.log('Member Ranking');
      
      image= `<img src="./img/member_image.jpeg">`
      target.innerHTML = image;
      // expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    case 5:
    case 6:
    // case 7:
          console.log('Rising Star Ranking');
          image= `<img src="./img/Rising_star.png">`
      
      target.innerHTML = image;
      break;
    case 7:
    case 8:
          console.log('Influencer Ranking')
          image= `<img src="./img/influencer_image.png">`
      
      target.innerHTML = image;
      break;
    case 9:
    case 10:
          console.log('All Access Ranking')
          image= `<img src="./img/all_access_image.png">`
      
      target.innerHTML = image;
    default:
      console.log(`All Access Ranking`);
  }
})

// const number = `${count}`

// const expr = 'Papayas';
// switch (expr) {
//   case 'Oranges':
//     console.log('Oranges are $0.59 a pound.');
//     break;
//   case 'Mangoes':
//   case 'Papayas':
//     console.log('Mangoes and papayas are $2.79 a pound.');
//     // expected output: "Mangoes and papayas are $2.79 a pound."
//     break;
//   default:
//     console.log(`Sorry, we are out of ${expr}.`);
// }

// const expr = 'Papayas';
// switch (expr) {
//   case 'Oranges':
//     console.log('Oranges are $0.59 a pound.');
//     break;
//   case 'Mangoes':
//   case 'Papayas':
//     console.log('Mangoes and papayas are $2.79 a pound.');
//     // expected output: "Mangoes and papayas are $2.79 a pound."
//     break;
//   default:
//     console.log(`Sorry, we are out of ${expr}.`);
