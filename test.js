var test = require("tape");
var todoFunctions = require("./logic");
//use this. to reference to the object where the functions are stored
//use local storage for id not to be reset when reloading the page

// TEST TAPE //
test('Tape is working', function (t) {
  t.pass('Tape is working');
  t.end();
});

// TESTS FOR NEW TO DO //
test("test a todo is an array", function (t) {
  var actual = todoFunctions.addTodo([], {}); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)
  if (Array.isArray(actual)) {
    t.pass("retuns an array");
  } else {
    t.fail();
  }
  t.end();
});

test("testing that the array only contains objects unless empty", function (t) {
  var actual = todoFunctions.addTodo([], {}); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)
  for (var i = 0; i < actual.length; i++) {
    if (typeof actual[i] !== "object" || Array.isArray(actual[i])) {
      t.fail("this array contains something other than objects");
    }
  }
  t.pass("this array only contains objects");
  t.end();
});


test("testing that the newTodo is added to the array", function (t) {
  var arr = todoFunctions.addTodo([], { description: "hi" })
  var actual = arr[arr.length - 1].description;
  var expected = "hi";
  t.equal(actual, expected, 'should return string');
  t.end();
});

test("testing that the newtodo has a done property", function (t) {
  var actual = todoFunctions.addTodo([], { description: "hi" }); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)
  for (var i = 0; i < actual.length; i++) {
    if (!actual[i].hasOwnProperty("done")) {
      t.fail();
    }
  }
  t.pass("new todo has a done property");
  t.end();
});

test("testing that the newtodo has an id", function (t) {
  var actual = todoFunctions.addTodo([], { description: "hi" }); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)
  for (var i = 0; i < actual.length; i++) {
    if (!actual[i].hasOwnProperty("id")) {
      t.fail();
    }
  }
  t.pass("new todo has an id property");
  t.end();
});

// TESTS FOR TO DO ITEM DELETION //
var array = [
  { id: 0, description: 'make tea', done: false },
  { id: 1, description: 'make 1 eggs', done: true },
  { id: 2, description: 'make 2 eggs', done: true },
  { id: 3, description: 'make 3 eggs', done: true },
  { id: 4, description: 'make 4 eggs', done: true },
  { id: 5, description: 'make 5 eggs', done: true },
];
var emptyArray = [];

test('Delete: No deletion arg passed', function (t) {
  var actual = todoFunctions.deleteTodo(array);
  var expected = [
    { id: 0, description: 'make tea', done: false },
    { id: 1, description: 'make 1 eggs', done: true },
    { id: 2, description: 'make 2 eggs', done: true },
    { id: 3, description: 'make 3 eggs', done: true },
    { id: 4, description: 'make 4 eggs', done: true },
    { id: 5, description: 'make 5 eggs', done: true },
  ];
  t.deepEqual(actual, expected, 'Arrays are cloned');
  t.end();
});

test('Delete: Remove id of 1', function (t) {
  var actual = todoFunctions.deleteTodo(array, 1);
  var expected = [
    { id: 0, description: 'make tea', done: false },
    { id: 2, description: 'make 2 eggs', done: true },
    { id: 3, description: 'make 3 eggs', done: true },
    { id: 4, description: 'make 4 eggs', done: true },
    { id: 5, description: 'make 5 eggs', done: true },
  ];
  t.deepEqual(actual, expected, 'Object id 1 removed');
  t.end();
});

test('Delete: Remove id of 3', function (t) {
  var actual = todoFunctions.deleteTodo(array, 3);
  var expected = [
    { id: 0, description: 'make tea', done: false },
    { id: 1, description: 'make 1 eggs', done: true },
    { id: 2, description: 'make 2 eggs', done: true },
    { id: 4, description: 'make 4 eggs', done: true },
    { id: 5, description: 'make 5 eggs', done: true },
  ];
  t.deepEqual(actual, expected, 'Object id 3 removed');
  t.end();
});

test('Delete: Empty array test no id', function (t) {
  var actual = todoFunctions.deleteTodo(emptyArray);
  var expected = emptyArray;
  t.deepEqual(actual, expected, 'Function doesn\'t run if array is empty');
  t.end();
});

test('Delete: Empty array test with id', function (t) {
  var actual = todoFunctions.deleteTodo(emptyArray, 2);
  var expected = emptyArray;
  t.deepEqual(actual, expected, 'Function doesn\'t run if array is empty');
  t.end();
});

test('Delete: Non existent id pass', function (t) {
  var actual = todoFunctions.deleteTodo(array, 8);
  var expected = [
    { id: 0, description: 'make tea', done: false },
    { id: 1, description: 'make 1 eggs', done: true },
    { id: 2, description: 'make 2 eggs', done: true },
    { id: 3, description: 'make 3 eggs', done: true },
    { id: 4, description: 'make 4 eggs', done: true },
    { id: 5, description: 'make 5 eggs', done: true },
  ];
  t.deepEqual(actual, expected, 'Object id 3 removed');
  t.end();
});

// TESTS FOR TO DO ITEM MARK //
var markArr = [
  { id: 0, description: 'make tea', done: true },
  { id: 1, description: 'make 1 eggs', done: false },
];

test("testing that specified item in the list has been marked as done, i.e. done =true", function (t) {
  var actual = todoFunctions.markTodo(array, 0); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)
  var expected = [
    { id: 0, description: 'make tea', done: true },
    { id: 1, description: 'make 1 eggs', done: true },
    { id: 2, description: 'make 2 eggs', done: true },
    { id: 3, description: 'make 3 eggs', done: true },
    { id: 4, description: 'make 4 eggs', done: true },
    { id: 5, description: 'make 5 eggs', done: true },
  ];
  t.deepEqual(actual, expected, 'Todo with ID 0 marked as done');
  t.end();
});

test("testing done=true toggles to  done=false", function (t) {
  var actual = todoFunctions.markTodo(markArr, 0); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)
  var expected = [
    { id: 0, description: 'make tea', done: false },
    { id: 1, description: 'make 1 eggs', done: false },
  ];
  t.deepEqual(actual, expected, 'Todo with ID 0 toggles from true to false');
  t.end();
});

test("testing done=false toggles to  done=true", function (t) {
  var actual = todoFunctions.markTodo(markArr, 1); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)
  var expected = [
    { id: 0, description: 'make tea', done: true },
    { id: 1, description: 'make 1 eggs', done: true },
  ];
  t.deepEqual(actual, expected, 'Todo with ID 1 toggles from false to true');
  t.end();
});

// TESTS FOR TO DO ITEM SORT //
var sortArr = [
  { id: 0, description: "tea", done: true },
  { id: 1, description: "eggs", done: true },
  { id: 2, description: "bacon", done: true },
  { id: 3, description: "avocado", done: true },
  { id: 4, description: "milk", done: true },
  { id: 5, description: "milk", done: true },
  { id: 6, description: "tomatoes", done: true }
];

test("Sort: A-Z", function (t) {
  var actual = todoFunctions.sortTodos(sortArr); // fixed from deleteTodo -> sortTodos function! 
  var expected = [
    { id: 3, description: "avocado", done: true },
    { id: 2, description: "bacon", done: true },
    { id: 1, description: "eggs", done: true },
    { id: 4, description: "milk", done: true },
    { id: 5, description: "milk", done: true },
    { id: 0, description: "tea", done: true },
    { id: 6, description: "tomatoes", done: true }
  ];
  t.deepEqual(actual, expected, "Sorted A-Z");
  t.end();
});




