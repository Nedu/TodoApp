var todoList = {
  todos: [],
  addTodo: function(todoText) {
    var input = document.getElementById('addTodoTextInput').value;
      this.todos.push({
        todoText: todoText,
        completed: false
      });
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    this.todos.forEach(function(todo) {
      if(todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      if(completedTodos === totalTodos) {
        todo.completed = false;
      }
      else {
        todo.completed = true;
      }
    });
    
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    if(addTodoTextInput.value !== '') {
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    }
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li');
      var todoDiv = document.createElement('div');
      var todoCheckbox = document.createElement('input');
      var todoTextWithCompletion = document.createTextNode(name);
      var todoLabel = document.createElement('label');
      
      if (todo.completed === true) {
        todoCheckbox.checked = true;
        todoLabel.style.textDecoration = "line-through"
      }
      else {
        todoCheckbox.checked = false;
      }      
      
      todoCheckbox.type = "checkbox";
      todoLabel.innerText = todo.todoText;
      todoDiv.className = 'todoDiv';
      todoLi.id = position;
      
      todoLi.appendChild(todoDiv);
      todoDiv.appendChild(todoCheckbox);
      todoDiv.appendChild(todoLabel);
      todoDiv.appendChild(todoTextWithCompletion);
      todoDiv.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = '✖';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setupEventListeners: function() {
    var todosUl = document.querySelector('ul');
    var todoInput = document.querySelector('.add');

    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.parentNode.id));
      }  
      else if (elementClicked.tagName === "INPUT") {
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.parentNode.id));
      } 
    });

    todoInput.addEventListener('keypress', function(event) {
      var keyPressed = event.target;
      
      if(keyPressed.id === 'addTodoTextInput') {
        if (event.keyCode == 13 && keyPressed.value) {
          handlers.addTodo(keyPressed.value);
          keyPressed.value = '';
        }
      }
    });
  }
};

view.setupEventListeners();










