// let callback = function () {
//     console.log(`hi there!!`);
// }
//
//
//
// setTimeout(()=>{
//   console.log(`hello there!!`);
// },3000);

// #callback test
// let students = [
//   {name:`allen`,score: 90, school:`East`},
//   {name:`bob`,score: 20, school:`West`},
//   {name:`john`,score: 50, school:`East`},
// ]
//
// function process(data,callback) {
//   for (var i = 0; i < students.length; i++) {
//     if (students[i].score>=50) {
//         if (typeof callback === `function`) {
//           callback(data[i]);
//         }
//     }
//   }
// }
//
// process(students,(obj)=>{
//   console.log(obj.name);
// })

//#require

const stuff = require('./requireModule.js');

//No.1 : export one Module (add)
// stuff(3,4)
//No.2 : export module object has functions
// stuff.multi(4,5)
//No.3 : module in object format
// stuff.divide(20,4);
