// "use strict"
//dom
const form = document.querySelector('form')
const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listTasks = document.querySelector('.list-tasks')
//global variables
let myListTasks = []

//functions
function addTask (){
    if(input.value===""){return}
    myListTasks.push({
        tarefa: input.value,
        concluida: false,

    })
    input.value = ""
    showTask()

}
function concluirTarefa (index){

    myListTasks[index].concluida = !myListTasks[index].concluida

console.log('clicou')
    showTask()
}


function showTask(){

   
    let newLi = ""
    myListTasks.forEach((item,index)=>{
    newLi += `<li class="task ${item.concluida && "done"}" >
                <i id="checIcon" class="fa-regular fa-circle-check"onclick="concluirTarefa(${index})"></i>
                <p>${item.tarefa}</p>
                <i id="editIcon"  class="fa-solid fa-pen-to-square"onclick="editTask(${index})"><i id="trashIcon" class="fa-solid fa-trash-can"onclick="deleteTask(${index})"></i></i>
                
            </li>`
        })

    listTasks.innerHTML = newLi
    guardarValor()
}

function guardarValor(){
localStorage.setItem('lista',JSON.stringify(myListTasks))
}

function pegarValor(){
const valor = localStorage.getItem('lista')
if (valor){
myListTasks = JSON.parse(valor)
}
showTask()
}

//cgpt

function editTask(index) {
    const listItem = document.querySelectorAll('.task')[index]
    const taskText = listItem.querySelector('p')
    const editButton = listItem.querySelector('#editIcon')

    // Se a tarefa não estiver em modo de edição, permita a edição
    if (!listItem.classList.contains('editing')) {
        listItem.classList.add('editing')
        taskText.contentEditable = true
        taskText.focus()
        editButton.classList.remove('fa-pen-to-square')
        editButton.classList.add('fa-save')
        editButton.addEventListener('click', function () {
            // Ao clicar em "Salvar", atualize o texto da tarefa na lista
            myListTasks[index].tarefa = taskText.textContent
            listItem.classList.remove('editing')
            taskText.contentEditable = false
            editButton.classList.remove('fa-save')
            editButton.classList.add('fa-pen-to-square')
            showTask()
        });
    }
}

//cgpt

function deleteTask(index){
    myListTasks.splice(index,1)

    showTask()
}

pegarValor()

//events
form.addEventListener('click',(e)=>{
    e.preventDefault()
})

button.addEventListener('click', addTask)

