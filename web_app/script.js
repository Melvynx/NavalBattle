const API_URL = 'https://localhost:5001/';

function postTodo(todo, isComplete, callback) {
  fetch(`${API_URL}api/todo`, {
    method: 'POST',
    body: JSON.stringify({ name: todo, isComplete }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(callback);
}

function apiGetTodos(callback) {
  var myHeaders = new Headers();
  myHeaders.method = 'GET';
  myHeaders.mode;

  fetch(`${API_URL}api/todo`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((reponse) => reponse.json())
    .then(callback);
}

function deleteTodo(id, callback) {
  fetch(`${API_URL}api/todo/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(callback);
}

function getTodos() {
  const app = document.getElementById('app');
  const todosWrapper = document.createElement('div');
  todosWrapper.setAttribute('id', 'todos');

  const loading = document.createElement('p');

  try {
    document.getElementById('todos').remove();
  } catch (e) {
    console.log('not find');
  }

  loading.innerText = 'loading...';
  app.append(loading);

  apiGetTodos((todos) => {
    todos.forEach((t) => {
      todosWrapper.append(createTodoNode(t));
    });
    app.appendChild(todosWrapper);
    loading.remove();
  });
}

function createTodo() {
  const name = document.getElementById('todo-name').value;
  const isComplete = document.getElementById('todo-isComplete').checked;

  postTodo(name, isComplete, getTodos);
}

function createTodoNode(todo) {
  const wrapper = document.createElement('div');
  wrapper.style.border = '1px solid black';
  wrapper.style.display = 'flex';
  wrapper.style.position = 'relative';
  const name = document.createElement('p');
  name.innerText = todo.name;
  const isComplete = document.createElement('p');
  isComplete.style.marginRight = '10px';
  isComplete.innerText = todo.isComplete;

  const destroyButton = document.createElement('button');
  destroyButton.innerText = 'Delete';
  destroyButton.style.position = 'absolute';
  destroyButton.style.top = '4px';
  destroyButton.style.right = '4px';
  destroyButton.addEventListener('click', () => {
    deleteTodo(todo.id, getTodos);
  });

  wrapper.append(isComplete);
  wrapper.append(destroyButton);
  wrapper.append(name);

  return wrapper;
}
