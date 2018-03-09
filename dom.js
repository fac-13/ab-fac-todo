// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");

  var state = [
    { id: -3, description: "feed the chickens", done: false },
    { id: -2, description: "build a treehouse", done: false },
    { id: -1, description: "do the catwalk", done: false }
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement("li");

    // you will need to use addEventListener
    var displayDescription = todo.description;

    // add a checkbox
    var checkbox = document.createElement("input");
    var lab = document.createElement("label");
    checkbox.setAttribute("aria-label", "checkbox");
    checkbox.setAttribute("role", "checkbox");
    checkbox.type = "checkbox";
    var checklab = lab.appendChild(checkbox);
    todoNode.appendChild(checklab);

    // add span holding description
    var text = document.createTextNode(displayDescription);
    todoNode.appendChild(text);
    // todoNode.addEventListener("click", function() {
    //   prompt("Edit your task",displayDescription);
    // });
    // this adds the delete button
    var deleteButtonNode = document.createElement("button");
    deleteButtonNode.classList.add("delete");
    deleteButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // This marks the todo as done or not done
    checkbox.addEventListener("click", function() {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });

    // Add correct attribute back to checkbox after markTodo
    // Needs to be done this way as the update func resets the whole list of todos
    if (todo.done) {
      checkbox.setAttribute("checked", "checked");
      checkbox.setAttribute("aria-checked", "true");
    } else {
      checkbox.removeAttribute("checked");
      checkbox.setAttribute("aria-checked", "false");
    }

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
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
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  // SORT FUNCTION
  // alphabetical
  var sortAplhaButton = document.getElementById("alphabetical");
  sortAplhaButton.addEventListener("click", function() {
    var newarr = todoFunctions.sortTodos(state, sortAplhaButton.value);
    update(newarr);
  });
  sortAplhaButton.addEventListener("click", function() {
    if (sortAplhaButton.textContent === 'Sort "A-Z"') {
      sortAplhaButton.textContent = 'Sort "Z-A"';
      sortAplhaButton.value ='za'
    } else {
      sortAplhaButton.textContent = 'Sort "A-Z"';
      sortAplhaButton.value = 'az';
    }
  });
  // by date added
  var sortDateButton = document.getElementById("date");
  sortDateButton.addEventListener("click", function() {
    var newarr = todoFunctions.sortTodos(state, sortDateButton.value);
    update(newarr);
  });
  sortDateButton.addEventListener("click", function() {
    if (sortDateButton.textContent === "New to Old") {
      sortDateButton.textContent = "Old to New";
      sortDateButton.value ='oldtonew'
    } else {
      sortDateButton.textContent = "New to Old";
      sortDateButton.value = 'newtoold';
    }
  });


  if (container) renderState(state);
})();
