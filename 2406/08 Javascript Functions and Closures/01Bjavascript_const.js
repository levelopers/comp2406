/* const variables in javascript

Observations:

It is important to understand that in the expression

const x = anObject;

The const qualifier is protecting the variable x and not the object
anObject that it refers to.

For example
const x = anObject;
x.name='Lou';
is legal.

Compare this to C++
const Person * p = new Person('Lou');
p->setName("Sue");  //Illegal
p = new Person("Sue"); //Legal

In C++ the const protects the object referred to, not the variable
that is referring to it.
*/

const person = {
  name: 'Lou',
  email: 'ldnel@carleton.ca'
}

person.name = 'Sue' //legal (object not protected)

person = {
  name: 'Sue',
  email: 'sue@carleton.ca'
} //illegal