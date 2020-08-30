import React, { Component } from "react";
import initialData from "../../initial-data";
import InnerColumnList from "../InnerColumnList/InnerColumnList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

//Icons
import { FiPlus } from 'react-icons/fi';

//Imports
import Modal from 'react-modal';

const MainContainerToBoard = styled.div`
display: flex;
flex-direction: row;
align-self: center;
justify-content: center;
width: 100%;
`;

const AddColumnContainer = styled.div`
margin: 2%;
border: 1px solid lightgrey;
background-color: #eaf4f4;
border-radius: 2px;
width: 15%;
height: 5em;
padding: auto;
display: flex;
flex-direction: column;
text-align: center;
`;

const Container = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  flex-direction: row;
  border: 1px solid lightgrey;
  overflow-x: scroll;
`;

const ButtonWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 10em;
`;

const customStyles = {
  content : {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '20%',
    width: '20%' 
  }
};
let subtitle;

//COMPONENT
class Board extends Component {
  state = initialData;

  onDragStart = (start, provided) => {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`
    );
  };

  onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;

    provided.announce(message);
  };

  onDragEnd = (result, provided) => {
    const message = result.destination
      ? `You have moved the task from position ${result.source.index + 1} to ${
      result.destination.index + 1
      }`
      : `The task has been returned to its starting position of ${
      result.source.index + 1
      }`;

    provided.announce(message);

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    //Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  // ADD A TASK
  addNewTaskToColumnList = (userInput) => {
    let taskCounter = Date.now()
    // let taskCounter = Object.keys(this.state.tasks).length + 1
    
    let testObj = {
      ...this.state.tasks,
      [`task-${taskCounter}`]: { id: `task-${taskCounter}`, content: userInput.content }
    }
    let column = [...this.state.columns[userInput.id].taskIds, `task-${taskCounter}`]
    let columns = {
      ...this.state.columns,
      [userInput.id]: {
        ...this.state.columns[userInput.id],
        "taskIds": column
      }
    }
    
    this.setState({ columns: columns, tasks: testObj })
  }

  addColumn = () => {
    this.setState({ addColumnModal: !this.state.addColumnModal })
  }

  handleInput = (e) => {
    const { value } = e.target
    this.setState({ newColumnInput: value })
  }

  addNewColumn = () => {
    let columnName = this.state.newColumnInput
    let columnCounter = Object.keys(this.state.columns).length + 1
    let column = {
      ...this.state.columns,
      [`column-${columnCounter}`]: {
        id: `column-${columnCounter}`,
        title: columnName,
        taskIds: []
      }
    }
    this.setState({
      columns: column,
      columnOrder: [...this.state.columnOrder, `column-${columnCounter}`],
      addColumnModal: false,
      newColumnInput: "",
    })
  }

  deleteTask = (task, columnID) => {
    let currentTasks = { ...this.state.tasks }
    let object = {}
    for (let key in currentTasks) {
      if (key !== task) {
        object[key] = currentTasks[key]
      }
    }
    let updatedColumns = { ...this.state.columns }
    let filtered = updatedColumns[columnID].taskIds.filter(item => item !== task)
    let newColumns = {
      ...this.state.columns,
    }
    newColumns[columnID].taskIds = filtered
    this.setState({ tasks: object, columns: newColumns })
  }

  deleteColumn = (id) => {
    console.log('column id', id);
    let tasksToDelete = this.state.columns[id].taskIds
    // console.log(tasksToDelete);
    let tasks = { ...this.state.tasks }


    let newTasks = {}
    for (let task in tasks) {
      if (!tasksToDelete.includes(task)){
        newTasks[task] = tasks[task]
      }
    }
    let updatedColumns = { ...this.state.columns };
     let newColumns = {};
     for (let column in updatedColumns) {
       if (column !== id) {
         newColumns[column] = updatedColumns[column];
       }
     }
    
    let updatedColOrder = [...this.state.columnOrder]
    let filtered = updatedColOrder.filter(item => item !== id)
    // console.log('newColumns', newColumns);
    this.setState({tasks: newTasks, columns: newColumns, columnOrder: filtered})
  }
  
  changeTitle = (newTitle, columnId) => {
    console.log('id', columnId);
    let updatedColumns = { ...this.state.columns };
    updatedColumns[columnId].title = newTitle
    console.log('uc', updatedColumns);
    this.setState({columns: updatedColumns})
  }

  render() {
    console.log(this.state);
    return (
      <MainContainerToBoard>
        <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];

                return (
                  <InnerColumnList
                    key={column.id}
                    column={column}
                    taskMap={this.state.tasks}
                    index={index}
                    changeTitle={this.changeTitle}
                    deleteTask={this.deleteTask}
                    addNewTaskToColumnList={this.addNewTaskToColumnList}
                    deleteColumn={this.deleteColumn}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      <AddColumnContainer>
        <p style={{ "fontSize": "1.3em", "alignSelf": "center", "textTransform": "uppercase"}} >Add a column</p>
        <FiPlus style={{"fontSize": "2.5em", "alignSelf": "center"}} onClick={this.addColumn} />
      </AddColumnContainer>
      {
        this.state.addColumnModal
        &&
        <Modal
          isOpen={this.state.addColumnModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>What's up column!</h2>
          {this.state.errorOnAdd && <p style={{"color": "red"}} >Please enter column title</p>}
          <label>Enter column title</label>
          <input
            placeholder="Enter column title"
            type="text"
            onChange={this.handleInput}
            value={this.state.newColumnInput}
          />
          <ButtonWrapper>
            <input onClick={this.addNewColumn}
            type="submit"
            value="add"
            style={{"margin": "5%", "width": "8em", "height": "2.5em"}}/>
            <input onClick={this.addColumn}
            type="submit"
            value="close"
            style={{"margin": "5%", "width": "8em", "height": "2.5em"}}/>
          </ButtonWrapper>
        </Modal>
      }
      </MainContainerToBoard>
    );
  }
}

export default Board;
