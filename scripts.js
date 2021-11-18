var arrayAddress = new Array();


form.addEventListener('submit', function (event) {
    event.preventDefault();

    let inputText = document.getElementById('inputText').value;
    addTaskItem(inputText);
    document.getElementById('inputText').value = '';
})

function addTaskItem(taskName) {
    let ol = document.getElementById('taskItems');
    let newLi = document.createElement('li');
    newLi.appendChild(document.createTextNode(taskItems));
    ol.appendChild(newLi);
    newLi.innerText = taskName;
    newLi.className = "liTask";
    newLi.id = taskName;

    let _local_storage = localStorage.getItem('enderecos');
    let jsonLocalStorage
    if(_local_storage === null){
        jsonLocalStorage = emptyStorage(taskName);
    }
    else{
        jsonLocalStorage = addToStorage(_local_storage, taskName);      
    }
    localStorage.setItem('enderecos', jsonLocalStorage);

    addCheckbox(newLi);
    addDeleteButton(_local_storage, newLi);
}

function emptyStorage(storageValue){
    let jsonAddress = '{"enderecos": ["' + storageValue + '"]}';        
    let object = JSON.parse(jsonAddress);
    return JSON.stringify(object);
}

function addToStorage(_local_storage, storageValue){
    arrayAddress = JSON.parse(_local_storage);
    arrayAddress['enderecos'].push(storageValue);
    return JSON.stringify(arrayAddress);
}


function addCheckbox(taskLi) {
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox")
    taskLi.appendChild(checkBox);

    checkBox.onclick = function () {
        if(checkBox.checked){
            taskLi.style = "text-decoration: line-through;";
        }
        else{
            taskLi.style = "text-decoration: none;";
        }
    }
}

function addDeleteButton(_local_storage, taskLi) {
    let button = document.createElement('button');
    button.innerText = "Excluir";
    taskLi.appendChild(button);

    button.onclick = function () { deleteTask(_local_storage, this) };
}

function deleteTask(_local_storage, elem) {
    let confirm = window.confirm('Voce tem certeza que deseja excluir esta tarefa?');
    if (confirm) {
        elem.parentElement.remove();
        
        _local_storage = localStorage.getItem('enderecos');
        var object = JSON.parse(_local_storage);
        arrayAddress = object.enderecos;

        let arrayDel = arrayAddress.filter(value => value !== elem.parentElement.id);

        object.enderecos = arrayDel;
        _local_storage = JSON.stringify(object);
        localStorage.setItem('enderecos', _local_storage);

        elem.parentElement.remove();
    }
}