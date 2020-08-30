import React, { Component } from "react";
import styled from "styled-components";
// import Task from "../Task/Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import InnerList from "../InnerList/InnerList";

//Icons
import { FiPlus } from 'react-icons/fi';

//Imports
import Modal from 'react-modal';

const Container = styled.div`
  margin: 2%;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 250px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "#b8d0eb" : "#eaf4f4"};
  flex-grow: 1;
  min-height: 100px;
`;

const ColumnHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center
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

class Column extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addTaskModal: false,
      newTaskInput: "",
      errorOnAdd: false
    }
  }

  componentDidMount = () => {
    Modal.setAppElement("#columnHeader");
  }

  addTask = () => {
  this.setState({addTaskModal: true})
  }

  handleInput = (e) => {
    const { value } = e.target
    this.setState({newTaskInput: value})
  }

  closeModal = () => {
    this.setState({addTaskModal: false});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#a663cc';
  }

  addNewTaskToColumn = () => {
    this.setState({errorOnAdd: false})
    if (!this.state.newTaskInput) {
      this.setState({errorOnAdd: true})
      return
    }
    let userObj = {
      content: this.state.newTaskInput,
      id: this.props.column.id
    }
    this.props.addNewTaskToColumnList(userObj)

    this.setState({addTaskModal: false, newTaskInput: ""});
  }

  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <Container id="columnHeader" {...provided.draggableProps} ref={provided.innerRef}>
            <ColumnHeader>
              <Title {...provided.dragHandleProps}>
                {this.props.column.title}
              </Title>
              <FiPlus style={{"marginRight":"5%"}} onClick={this.addTask}/>
            </ColumnHeader>

            {
            this.state.addTaskModal
            &&
            <Modal
              isOpen={this.state.addTaskModal}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={_subtitle => (subtitle = _subtitle)}>How YOU Doin?</h2>
              {this.state.errorOnAdd && <p style={{"color": "red"}} >Please enter a new task</p>}
              <label>Enter a new Task</label>
              <input
                placeholder="add new task"
                type="text"
                onChange={this.handleInput}
                value={this.state.newTaskInput}
              />
              <ButtonWrapper>
                <input onClick={this.addNewTaskToColumn}
                type="submit"
                value="add"
                style={{"margin": "5%", "width": "8em", "height": "2.5em"}}/>
                <input onClick={this.closeModal}
                type="submit"
                value="close"
                style={{"margin": "5%", "width": "8em", "height": "2.5em"}}/>
              </ButtonWrapper>
            </Modal>
            }

            <Droppable droppableId={this.props.column.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList tasks={this.props.tasks} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Column;
