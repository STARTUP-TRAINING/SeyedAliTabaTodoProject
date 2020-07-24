let store = {
    TodoList: [],
    DoingList: [],
    DoneList: [],
}

function removeFromList(key, listItem){
    console.log(key, listItem);
    store[key].splice(listItem, 1);
    console.log(store[key]);
    render();
}

function createBtn(key, listItem, name, func){
    let button = document.createElement('button');
    button.addEventListener('click', () =>{
        func(key, listItem);
    })
    button.innerHTML = name;
    button.setAttribute('class', 'table-switch-btn')
    return button;
}

function render(){
    for(let key in store){
        let documentList = document.getElementById(key);
        console.log(documentList.children);
        documentList.innerText = "";
        for(let listItem in store[key]){
            let value = store[key][listItem];
            let nowItem = document.createElement('div');
            nowItem.className = "list-item";
            let pElement = document.createElement('p');
            pElement.innerHTML = value;
            nowItem.appendChild(pElement);
            let btnContext = document.createElement('div');
            btnContext.setAttribute('class', 'btn-context');
            btnContext.appendChild(createBtn(key, listItem, 'remove', removeFromList));
            nowItem.appendChild(btnContext);
            documentList.appendChild(nowItem);
        }
    }
}



const addToListButton = document.getElementById('add-to-list');
addToListButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const TodoInput = document.getElementById('todo-input');
    if(TodoInput.value !== ''){
        store.TodoList.push(TodoInput.value);
    }
    render();
});







