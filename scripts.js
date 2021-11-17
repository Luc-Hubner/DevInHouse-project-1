form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('click addTask button');

    let inputText = document.getElementById('inputText').value;
    addTaskItem(inputText);
    document.getElementById('inputText').value = '';
})

function addTaskItem(taskName) {
    var ol = document.getElementById('taskItems');
    var newLi = document.createElement('li');
    newLi.appendChild(document.createTextNode(taskItems));
    ol.appendChild(newLi);
    newLi.innerText = taskName;
    newLi.className = "liTask";

    //localStorage.JSON

    addCheckbox(newLi);
    addDeleteButton(newLi);

}

function addCheckbox(taskLi) {
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox")
    taskLi.appendChild(checkBox);

    checkBox.onclick = function () {
        if(checkBox.checked){
            taskLi.style = "text-decoration: line-through;";//TODO: not affect the delete button
        }
        else{
            taskLi.style = "text-decoration: none;";
        }
    }
}

function addDeleteButton(taskLi) {
    var button = document.createElement('button');
    button.innerText = "Excluir";
    taskLi.appendChild(button);

    button.onclick = function () { deleteTask(this) };
}

function deleteTask(elem) {
    let confirm = window.confirm('Voce tem certeza que deseja excluir esta tarefa?');
    if (confirm) {
        elem.parentElement.remove();
    }
}
