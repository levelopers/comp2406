
let add = (a,b)=>{
  console.log(`the result of add is ${a+b}`);
}
let multi = function(a,b){
  console.log(`the result of multiply is ${a*b}`);
}
let div = (a,b)=>{
  console.log(`the result of divide is ${a/b}`);
}

//first : export function as one function
//module.exports = add;

//second : export methods in one Module object
// module.exports.add = add;
// module.exports.multi = multi;
// module.exports.div = div;

//third : export Module in objest format
module.exports = {
  plus:add,
  multiply:multi,
  divide: div
}
