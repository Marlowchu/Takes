// const fs = require('fs');

const Fan = require ('./fan');
const Member = require ('./member');
const RisingStar = require ('./risingStar');
const Influencer = require ('./influencer');
const AllAccess = require ('./allAccess');


// const hierachy = hierachy()

console.log('Program Starting');


let totalPoints = 10;

const ranking = new Fan 
const ranking2 = new Member
const ranking3 = new RisingStar
const ranking4 = new Influencer
const ranking5 = new AllAccess
 
const hierachy = () => {  
    if ( totalPoints >= 2 && totalPoints < 5){
        
       
    console.log(`You are a ${ranking2.getRole()}`)
    
    }else if
        (totalPoints  >=5 && totalPoints < 8){
        console.log(`You are a ${ranking3.getRole()}`)
    
    }else if
    
    (totalPoints  >=8 && totalPoints < 10){

    console.log(`You are a ${ranking4.getRole()}`)
    
    }else if
    (totalPoints >=10 ){

       console.log(`You are a ${ranking5.getRole()}`)

    }else{
          
    (totalPoints  >=0 && totalPoints < 2)

        console.log(`You are a ${ranking.getRole()}`);
    }
}
    
hierachy();
    
console.log('Program ending');
    
    
    // () =>
    
//     }else if

//     risingStar() =>  if {
//         
//     }else if{

//     influencer() =>  if {
//         totalPoints = >=8 && < 13
//     }else if{

//     allAccess() =>   if {
//         totalPoints = >=13
//     }else{ 
//         fan() => {
//         totalPoints = >= 0 && < 2

// })

// fan();
// member();
// risingStar() 
// influencer() 
// allAccess()