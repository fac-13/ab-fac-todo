var test = require("tape");
var todoFunctions = require("./logic");

var array = [
  { id: 0, description: 'make tea', done: false },
  { id: 1, description: 'make eggs', done: true },
];

//use this. to reference to the object where the functions are stored
//use local storage for id not to be reset when reloading the page

test('Tape is working', function (t) {
  t.pass('Tape is working');
  t.end();
});

test('Test actual expected', function (t) {
  var actual = todoFunctions.deleteTodo(array);
  var expected = [
    { id: 0, description: 'make tea', done: false },
    { id: 1, description: 'make eggs', done: false },
  ]; ;
  t.deepEqual(actual, expected,'Arrays are equal');
  t.end();
});
