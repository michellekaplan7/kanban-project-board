import React, { PureComponent } from "react";
import Column from "../Column/Column";

class InnerColumnList extends PureComponent {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

export default InnerColumnList;
