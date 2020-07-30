function addItem(columnId, itemName){
    const id = createId();
    store[columnId].items[id] = { itemName };
}

function removeItem(columnId, itemId){
    delete store[columnId].items[itemId];
}

function changeColumnItem(fromColumnId, toColumnId, itemId){
    const itemName = store[fromColumnId].items[itemId].itemName;
    removeItem(fromColumnId, itemId);
    addItem(toColumnId, itemName);
}