import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import { v1 } from 'uuid';

export type FilterValueType = 'all' | 'completed' | 'active';

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false }
  ]);


  let [filter, setFilter] = useState<FilterValueType>('all');


  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  }

  const addTask = (title: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  const changeFilter = (value: FilterValueType) => {
    setFilter(value);
  }

  const changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find((t) => t.id === taskId)

    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  }

  let tasksForTodoList = tasks;

  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true);
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => t.isDone === false);
  }

  return (
    <div className="App">
      <Todolist title='What to Learn?'
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />


    </div>
  );
}



export default App;

