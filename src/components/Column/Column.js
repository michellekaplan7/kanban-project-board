import React, { Component } from "react";
import styled from "styled-components";
// import Task from "../Task/Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import InnerList from "../InnerList/InnerList";

//Icons
import { FiPlus, FiEdit3, FiDelete } from "react-icons/fi";
import { GiSaveArrow } from "react-icons/gi";


//Imports
import Modal from 'react-modal';

const Container = styled.div`
  margin: 2%;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 350px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
  display: flex;
  width: 80%;
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
    super(props);
    this.state = {
      addTaskModal: false,
      deleteColumn: false,
      newTaskInput: "",
      errorOnAdd: false,
      changeTitle: false,
      newTitleInput: this.props.column.title
    };
  }

  componentDidMount = () => {
    Modal.setAppElement("#columnHeader");
  };

  addTask = () => {
    this.setState({ addTaskModal: true });
  };

  handleInput = (e) => {
    const { value } = e.target;
    this.setState({ newTaskInput: value });
  };

  handleTitleInput = (e) => {
     const { value } = e.target;
     this.setState({ newTitleInput: value });
  }

  closeModal = () => {
    this.setState({ addTaskModal: false, deleteColumn: false });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#a663cc";
  };

  addNewTaskToColumn = () => {
    this.setState({ errorOnAdd: false });
    if (!this.state.newTaskInput) {
      this.setState({ errorOnAdd: true });
      return;
    }
    let userObj = {
      content: this.state.newTaskInput,
      id: this.props.column.id,
    };
    this.props.addNewTaskToColumnList(userObj);

    this.setState({ addTaskModal: false, newTaskInput: "" });
  };

  editColumnName = () => {
   this.setState({changeTitle: true})
  };

  deleteColumn = () => {
    this.setState({ deleteColumn: true });
    console.log("delete column name");
  };

  changeTitleFinal = () => {
    this.props.changeTitle(this.state.newTitleInput, this.props.column.id);
    this.setState({changeTitle: false})
  }

  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <Container
            id="columnHeader"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <ColumnHeader>
              <Title {...provided.dragHandleProps}>
                {this.state.changeTitle ? (
                  <GiSaveArrow
                    style={{ marginRight: "5%" }}
                    onClick={this.changeTitleFinal}
                  />
                ) : (
                  <FiEdit3
                    style={{ marginRight: "5%" }}
                    onClick={this.editColumnName}
                  />
                )}
                {!this.state.changeTitle ? (
                  this.props.column.title
                ) : (
                  <input
                    placeholder={this.props.column.title}
                    value={this.state.newTitleInput}
                    onChange={this.handleTitleInput}
                  />
                )}
              </Title>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FiPlus
                  style={{ marginRight: "5%", fontSize: "1.5em" }}
                  onClick={this.addTask}
                />
                <FiDelete
                  style={{ marginRight: "5%", fontSize: "1.5em" }}
                  onClick={this.deleteColumn}
                />
              </div>
            </ColumnHeader>

            {this.state.addTaskModal && (
              <Modal
                isOpen={this.state.addTaskModal}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                  How YOU Doin?
                </h2>
                {this.state.errorOnAdd && (
                  <p style={{ color: "red" }}>Please enter a new task</p>
                )}
                <label>Enter a new Task</label>
                <input
                  placeholder="add new task"
                  type="text"
                  onChange={this.handleInput}
                  value={this.state.newTaskInput}
                />
                <ButtonWrapper>
                  <input
                    onClick={this.addNewTaskToColumn}
                    type="submit"
                    value="add"
                    style={{ margin: "5%", width: "8em", height: "2.5em" }}
                  />
                  <input
                    onClick={this.closeModal}
                    type="submit"
                    value="close"
                    style={{ margin: "5%", width: "8em", height: "2.5em" }}
                  />
                </ButtonWrapper>
              </Modal>
            )}
            {this.state.deleteColumn && (
              <Modal
                isOpen={this.state.deleteColumn}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                  All tasks in the column and column will be deleted.
                </h2>

                <p>Are You Sure?</p>
                <ButtonWrapper>
                  <input
                    onClick={() =>
                      this.props.deleteColumn(this.props.column.id)
                    }
                    type="submit"
                    value="DELETE"
                    style={{ margin: "5%", width: "8em", height: "2.5em" }}
                  />
                  <input
                    onClick={this.closeModal}
                    type="submit"
                    value="CANCEL"
                    style={{ margin: "5%", width: "8em", height: "2.5em" }}
                  />
                </ButtonWrapper>
              </Modal>
            )}

            <Droppable droppableId={this.props.column.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList
                    tasks={this.props.tasks}
                    columnID={this.props.column.id}
                    deleteTask={this.props.deleteTask}
                  />
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
