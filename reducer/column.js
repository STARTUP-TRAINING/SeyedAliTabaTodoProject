function createColumn(columnName){
    const id = createId();
    store[id] = {
        columnName,
        items: {},
    };
}

function removeColumn(columnId){
    store[columnId].remove();;
}