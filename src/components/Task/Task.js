import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { FiDelete } from "react-icons/fi";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "#b298dc" : "white")};
  display: flex;
  justify-content: space-between;
  align-items: center
`;

class Task extends Component {


  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            aria-roledescription="Press the space bar to lift the task"
          >
            {this.props.task.content}
            <FiDelete
              style={{ fontSize: "1.5em", alignSelf: "center" }}
              onClick={() => this.props.deleteTask(this.props.task.id, this.props.id)}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
