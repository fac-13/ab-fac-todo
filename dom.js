
// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function () {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');


  var state = [
    { id: -3, description: 'first todo', done: false },
    { id: -2, description: 'second todo', done: false },
    { id: -1, description: 'third todo', done: false },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function (todo) {
    var todoNode = document.createElement('li');

    // you will need to use addEventListener
    var displayDescription = todo.description;

    // add a checkbox
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    todoNode.appendChild(checkbox);

    // add span holding description 
    var text = document.createTextNode(displayDescription);
    todoNode.appendChild(text);
    // todoNode.addEventListener("click", function() {
    //   prompt("Edit your task",displayDescription);
    // });
    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.addEventListener('click', function (event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // This marks the todo as done or not done
    checkbox.addEventListener('click', function () {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });

    // Add correct attribute back to checkbox after markTodo
    // Needs to be done this way as the update func resets the whole list of todos 
    if (todo.done) {
      checkbox.setAttribute('checked', 'checked');
    } else {
      checkbox.removeAttribute('checked');
    }

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function (event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      event.preventDefault();
      var description = event.target[0].value;
      var newState = todoFunctions.addTodo(state, { description: description });
      update(newState);
      addTodoForm.reset(); // clears the description field in the form on submission.
    });
  }

  // you should not need to change this function
  var update = function (newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function (state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));

    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };


  var sortButton = document.getElementById("az");
  sortButton.addEventListener("click", function () {
    var newarr = todoFunctions.sortTodos(state);
    update(newarr);
  });


  var newtoold = document.getElementById('newtoold');
  newtoold.addEventListener("click", function () {
    update(state.reverse());
  });

  newtoold.addEventListener('click', function () {
    var newoldbutton = document.getElementById('newtoold');
    if (newoldbutton.textContent === 'New to Old') {
      newoldbutton.textContent = 'Old to New'
    } else {
      newoldbutton.textContent = 'New to Old'
    }

  }
  );


  if (container) renderState(state);
})();