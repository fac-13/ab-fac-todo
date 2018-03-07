var test = require("tape");
var todoFunctions = require("./logic.js");

// TESTING THE ADDTODO FUNCTION
test("test a todo is an array", function(t) {
  var actual = todoFunctions.addTodo([], {}); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)

  if (Array.isArray(actual)) {
    t.pass();
  } else {
    t.fail();
  }
  t.end();
});

test("testing that the array only contains objects unless empty", function(t) {
  var actual = todoFunctions.addTodo([], {}); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)
  for (var i = 0; i < actual.length; i++) {
    if (typeof actual[i] !== "object" || Array.isArray(actual[i])) {
      t.fail("this array contains something other than objects");
    }
  }
  t.pass("this array only contains objects");
  t.end();
});

test("testing that the newTodo is added to the array", function(t) {
  var actual = todoFunctions.addTodo([], { description: "hi" }); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)
  var last = actual[actual.length - 1].description;
  if (last === "hi") {
    t.pass();
  } else {
    t.fail();
  }
  t.end();
});

test("testing that the newtodo has an id", function(t) {
  var actual = todoFunctions.addTodo([], { description: "hi" }); // the 'todoFunction' refers to the name of the variable you require (NOT the name of the object in the other file)
  for (var i = 0; i < actual.length; i++) {
    if (!actual[i].hasOwnProperty("id")) {
      t.fail();
    }
  }
  t.pass();

  t.end();
});
