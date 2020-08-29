// onDragStart
const start = {
    draggableId: 'task-1',
    type: 'TYPE',
    source: {
        droppableId: 'column-1',
        index: 0,
    },
};

// onDragUpdate
const update = {
    ...start, 
    destination: {
        droppableId: 'column-1',
        index: 1,
    },
};

// onDragUpdate if it's not over anything
// const update = {
//     ...start, 
//     destination: null
// };

// onDragEnd
const result = {
    ...update,
    reason: 'DROP',
};