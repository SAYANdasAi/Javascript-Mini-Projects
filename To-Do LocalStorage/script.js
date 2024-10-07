document.addEventListener('DOMContentLoaded',()=>{
const todoInput = document.getElementById('todo-input');
const addtask = document.getElementById('add-task-btn');
const todoItems = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) ||[];

tasks.forEach(task => renderTasks(task))

addtask.addEventListener('click',()=>{
    const taskText = todoInput.value.trim();
    if(taskText === "") return;

    const newTask = {
        id:Date.now(),
        text: taskText,
        completed: false
    }
    tasks.push(newTask);
    saveTask();
    renderTasks(newTask);

    todoInput.value = "";
    console.log(tasks);
})

function renderTasks(task){
    const li = document.createElement('li');
    li.setAttribute('data-id',task.id)
    if(task.completed) li.classList.add('completed')
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    li.addEventListener("click",(e) => {
        if(e.target.tagName === "BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle('completed');
        saveTask();
    });

    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation(); //prevent toggle from firing
        tasks = tasks.filter(t=>t.id !== task.id)
        li.remove();
        saveTask();
    })

    todoItems.appendChild(li);
}

function saveTask(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
})