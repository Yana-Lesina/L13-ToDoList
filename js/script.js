const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let toDoData = []


const render = function() {
  todoList.innerHTML = ''
  todoCompleted.innerHTML = ''

  toDoData.forEach(function(item, index) {
    const li = document.createElement('li')
    
    li.classList.add('todo-item')
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
                    '<div class="todo-buttons">' +
                        '<button class="todo-remove"></button>' +
                        '<button class="todo-complete"></button>' +
                    '</div>'
    if(item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function() {
      item.completed = !item.completed
      localStorage.clear();
      localStorage.setItem ('toDoData', JSON.stringify(toDoData));
      render()
    })

    li.querySelector('.todo-remove').addEventListener('click', function() {
      toDoData.splice(index, 1);
      localStorage.clear();
      localStorage.setItem ('toDoData', JSON.stringify(toDoData));
      render()
    })
  })
}


todoControl.addEventListener('submit', function(event) {
  event.preventDefault() //остановка перезагрузки
  
  //проверка на пустую строку или строку только из пробелов
  if(headerInput.value !== '' && +headerInput.value !== 0) {
    const newToDo = {
    text: headerInput.value,
    completed: false
    };

    toDoData.push(newToDo)
    headerInput.value = ''

    localStorage.clear();
    localStorage.setItem ('toDoData', JSON.stringify(toDoData));

    render()
  }
})



// localStorage.clear()
if(localStorage.getItem(key = 'toDoData') !== null) {
  toDoData = (JSON.parse(localStorage.getItem(key = 'toDoData')))
  console.log(toDoData);
}

render()