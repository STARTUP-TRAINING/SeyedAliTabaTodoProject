let store = {
    Todo: [],
    Doing: [],
    Done: [],
}

function addAndRemoveCustomList (removeFrom, listItem, addTo){
    console.log(store[addTo]);
    store[addTo].push(store[removeFrom][listItem]);
    removeFromList(removeFrom, listItem);
}

function removeFromList(key, listItem){
    // console.log(key, listItem);
    store[key][listItem] = "";
    console.log(store[key]);
    render();
}

function createRemoveBtn(key, listItem, name, func){
    let button = document.createElement('button');
    button.addEventListener('click', () =>{
        func(key, listItem);
    })
    button.innerHTML = name;
    button.setAttribute('class', 'table-switch-btn')
    return button;
}

function createMoveBtn(removeFrom, listItem, addTo, name){
    let button = document.createElement('button');
    button.addEventListener('click', () =>{
        addAndRemoveCustomList(removeFrom, listItem, addTo);
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
            if(value === "")
                continue;
            let nowItem = document.createElement('div');
            nowItem.className = "list-item";
            let pElement = document.createElement('p');
            pElement.innerHTML = value;
            nowItem.appendChild(pElement);
            let btnContext = document.createElement('div');
            btnContext.setAttribute('class', 'btn-context');
            for(let moveKey in store){
                btnContext.appendChild(createMoveBtn(key,listItem, moveKey, moveKey))
            }
            btnContext.appendChild(createRemoveBtn(key, listItem, 'remove', removeFromList));
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
        store.Todo.push(TodoInput.value);
    }
    TodoInput.value = "";
    render();
});







