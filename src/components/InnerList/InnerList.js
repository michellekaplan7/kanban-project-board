import React, { Component } from "react";
import Task from "../Task/Task";

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} id={this.props.columnID} index={index} deleteTask={this.props.deleteTask} />
    ));
  }
}

export default InnerList;
