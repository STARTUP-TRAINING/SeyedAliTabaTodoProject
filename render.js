function createRemoveBtn(fromId, itemId){
    let button = document.createElement('button');
    button.addEventListener('click', () =>{
        removeItem(fromId, itemId);
        render();
    })
    button.innerHTML = 'remove';
    button.setAttribute('class', 'table-switch-btn')
    return button;
}

function createMoveBtn(removeFrom, addTo, itemId){
    const name = store[addTo].columnName;
    let button = document.createElement('button');
    button.addEventListener('click', () =>{
        changeColumnItem(removeFrom, addTo, itemId);
        render();
    })
    button.innerHTML = name;
    button.setAttribute('class', 'table-switch-btn')
    return button;
}

function createItemsElement(columnId){
    const itemsBoxElement = document.createElement('div');
    itemsBoxElement.className = "board-col-1";
    for(const itemId in store[columnId].items){
        const item = store[columnId].items[itemId];
        const itemName = item.itemName;
        if(itemName === "")
            continue;
        let nowItem = document.createElement('div');
        nowItem.className = "list-item";
        let pElement = document.createElement('p');
        pElement.innerHTML = itemName;
        nowItem.appendChild(pElement);
        let btnContext = document.createElement('div');
        btnContext.setAttribute('class', 'btn-context');
        for(let moveKey in store){
            if(moveKey !== columnId)
                btnContext.appendChild(createMoveBtn(columnId,moveKey, itemId))
        }
        btnContext.appendChild(createRemoveBtn(columnId, itemId));
        nowItem.appendChild(btnContext);
        itemsBoxElement.appendChild(nowItem);
    }
    return itemsBoxElement;
}

function createAddItemFormElement(columnId){
    const formElement = document.createElement('form');
    const labelElement = document.createElement('label');
    labelElement.innerHTML = 'item name : ';
    const inputElement = document.createElement('input');
    inputElement.type = "text";
    const submitElement = document.createElement('button');
    submitElement.innerHTML = "Add";
    submitElement.addEventListener('click', (e)=>{
        e.preventDefault();
        if(inputElement.value !== ''){
            addItem(columnId, inputElement.value)
            inputElement.value = '';
        }
        render();
    })
    formElement.appendChild(labelElement);
    formElement.appendChild(inputElement);
    formElement.appendChild(submitElement);

    return formElement;
}

function createColumnElement(columnId){
    let columnBox = document.createElement('div');
    let itemsBox = document.createElement('div');
    itemsBox.className = "item";
    let header = document.createElement('h2');
    header.innerHTML = store[columnId].columnName;
    let items = createItemsElement(columnId);
    itemsBox.appendChild(header);
    itemsBox.appendChild(items);
    let createItemBox = document.createElement('div');
    createItemBox.className = "add-search";
    createItemBox.appendChild(createAddItemFormElement(columnId));
    columnBox.appendChild(itemsBox);
    columnBox.appendChild(createItemBox);
    return columnBox;
}

function createAddColumnButtonElement() {
    const mainElement = document.createElement('div');
    const innerElement = document.createElement('div');
    innerElement.className = 'item';
    const h2 = document.createElement('h2');
    h2.innerHTML = 'CREATE COLUMN';
    const buttonBox = document.createElement('div')
    buttonBox.className = 'add-search';
    const formElement = document.createElement('form');
    const labelElement = document.createElement('label');
    labelElement.innerHTML = 'column name : ';
    const inputElement = document.createElement('input');
    inputElement.type = "text";
    const submitElement = document.createElement('button');
    submitElement.innerHTML = "Add";
    submitElement.addEventListener('click', (e)=>{
        e.preventDefault();
        if(inputElement.value !== ''){
            createColumn(inputElement.value);
            inputElement.value = '';
        }
        render();
    })
    formElement.appendChild(labelElement);
    formElement.appendChild(inputElement);
    formElement.appendChild(submitElement);
    buttonBox.appendChild(formElement);
    innerElement.appendChild(h2);
    innerElement.appendChild(buttonBox);
    mainElement.appendChild(innerElement);
    return mainElement;
}

function render(){
    const board = document.getElementById('main-board');
    board.innerHTML = "";
    for(const columnId in store){
        const columnElement = createColumnElement(columnId);
        board.appendChild(columnElement)
    }
    board.appendChild(createAddColumnButtonElement());
}