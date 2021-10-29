import React, { useState } from "react";
import Task from '../model/task-model';

type TaskObj = {
  tasks: Task[];
  addTask: (taskInput: string) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
  clearTasks: () => void;
};

export const TaskContext = React.createContext<TaskObj>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  completeTask: () => {},
  clearTasks: () => {}
});

const TaskContextProvider: React.FC = props => {
  const [taskList, setTaskList] = useState<Task[]>([]);


  const addTaskHandler = (taskInput: string) => {
    const newTask = new Task(taskInput);

    setTaskList(prevTaskList => [newTask, ...prevTaskList]);
  }

  const removeTaskHandler = (taskId: string) => {
    setTaskList(prevTaskList => prevTaskList.filter(task => task.id !== taskId))
  }

  const completeTaskHandler = (taskId: string) => {
    setTaskList(prevTaskList => prevTaskList.map(task => {
      if(task.id === taskId) return {...task, completed: !task.completed}
      return task;
    }
    ))
  }

  const clearTaskHandler = () => {
    setTaskList([]);
  }


  const contextValue = {
    tasks: taskList,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
    completeTask: completeTaskHandler,
    clearTasks: clearTaskHandler
  }

  return (
    <TaskContext.Provider value={contextValue}>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskContextProvider;


