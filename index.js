const todoInput = document.querySelector('#todo-item')
const todoList = document.querySelector('.todo-list')
const form = document.querySelector('form')
const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
const todos = [...savedTodos]

function todoFactory(string) {
  const newTodo = document.createElement('LI')
  newTodo.innerText = string
  newTodo.classList.add('todo-item')
  const deleteBtn = document.createElement('I')
  deleteBtn.classList.add('fa-sharp', 'fa-solid', 'fa-square-xmark')
  newTodo.append(deleteBtn)
  return newTodo
}

for (let i = 0; i < savedTodos.length; i++) {
  const createdTodo = todoFactory(savedTodos[i])
  todoList.appendChild(createdTodo)
  console.log(createdTodo)
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  if (todoInput.value) {
    const createdTodo = todoFactory(todoInput.value)
    todoList.appendChild(createdTodo)
    todoInput.value = ''
    todos.push(createdTodo.innerText)
    localStorage.setItem('todos', JSON.stringify(todos))
  }
})

// I had a hard time with this block and had to research on StackOverflow
function removeFromStorage(itemToRemove) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i] === itemToRemove) {
      todos.splice(i, 1)
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos))
}

todoList.addEventListener('click', function (e) {
  if (e.target.tagName === 'I') {
    e.target.parentElement.remove()
    removeFromStorage(e.target.parentElement.innerText)
  } else if (e.target.tagName === 'LI') {
    e.target.classList.toggle('todo-complete')
  }
  console.log(e.target.innerText)
})
