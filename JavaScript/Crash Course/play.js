const name = "Aakanksha"; 
let age = 21;
var hobbies = true; // var is outdated

const summarizeUser = (userName, userAge, userHobbies) => { 
    //instead of using 'function' keyword we use the arrow function
    return ('Name is ' + userName + ', Age is ' + userAge + ' and the user has hobby ' + userHobbies);
}

const add = (a,b) => a + b; // for one line AF when we have only one return statement

const addOne = a => a + 1; // for only one function parameter, parenthesis are not required

const addRandom = () => 20 + 3; // for no parameters in AF, empty parenthesis are must!

console.log(add(1,2))
console.log(addOne(1))
console.log(addRandom())
console.log(summarizeUser(name, age, hobbies ))

const person = {
    name: 'Aakanksha',
    age1: 21,
    greet() { 
        /* AF do not work here, so use 'function' keyword or 'this' (here this is a function but
         'function' keyword, ':' and AF are omitted between greet and (), to shorten the code.)*/
        console.log('Hi, I am ' + this.name);
    }
}
person.greet();

const printName = ({ name }) => { // to pull out property using destructuring by defining new AF.
  console.log(name); 
}
printName(person);

const { age1, greet } = person; // to pull out property using desturcturing without defining new function.
console.log( age1, greet );

const curriculum = ['Sports', 'Swimming', 234, true];
// Array with string, number, boolean as a value in it.

const [ hobby1, hobby2 ] = curriculum;
console.log( hobby1, hobby2 ); // to pull out property using destructuring in array.

// Use of for-of loop to get every element in the array.
for (let hobby of curriculum) {
    console.log(hobby);
}
curriculum.push('Programming'); // to add element to existing constant array.
console.log(curriculum.map(hobby => 'Hobby is ' + hobby ));
// to add a new array while the old one is existing with the '.'event'' syntax.

//const copiedArray = [curriculum]; this is nested array
const copiedArray = [...curriculum]; 
// this is copying array using 'spread(...)' operator. Can be done for objects too in same way.
console.log(copiedArray) 

const toArray = (...args) => {
    return args;
}
// this is a AF with 'rest(...)' operator to add as many args as required.
console.log(toArray(1, 2, 3, 4));


/////////* THIS WAS SYNC CODE */////////
/////////* NOW WE START WITH ASYNC CODE*//////////

const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done!');
      }, 1500);
    });
    return promise;  
  };
  
setTimeout(() => {
  console.log('Timer is done!');
  fetchData()
    .then(text => {
      console.log(text);
      return fetchData();
    })
    .then(text2 => {
      console.log(text2);
    });
}, 2000);