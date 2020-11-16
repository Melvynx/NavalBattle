const API_URL = 'https://localhost:5001/';

console.log('fun');

function postTodo(todo, isComplete) {
  fetch(API_URL + 'api/todo', {
    method: 'POST',
    body: JSON.stringify({ name: todo, isComplete }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

function apiGetTodos(callback) {
  console.log('fetch');
  var myHeaders = new Headers();
  myHeaders.method = 'GET';
  myHeaders.mode;

  fetch(API_URL + 'api/todo', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((reponse) => reponse.json())
    .then(callback);
}

function getTodos() {
  console.log('get todod');
  const app = document.getElementById('app');
  const todosWrapper = document.createElement('div');
  const loading = document.createElement('p');
  loading.innerText = 'loading...';
  app.append(loading);

  apiGetTodos((todos) => {
    todos.forEach((t) => {
      app.append(createTodo(t));
    });
    loading.childElementCount();
  });
}

function createTodo(todo) {
  const wrapper = document.createElement('div');
  wrapper.style.border = '1px solid black';
  wrapper.style.display = 'flex';
  const name = document.createElement('p');
  name.innerText = todo.name;
  const isComplete = document.createElement('a');
  isComplete.innerText = todo.isComplete;

  wrapper.append(isComplete);
  wrapper.append(name);

  return wrapper;
}
