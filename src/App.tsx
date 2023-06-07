import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';

export type FilterValueType = 'all' | 'completed' | 'active';

type ToDolistType = {
  id: string,
  title: string,
  filter: FilterValueType,
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {


  let toDoListId1 = v1();
  let toDoListId2 = v1();

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [toDoListId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],
    [toDoListId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: true },


    ]
  });

  const removeTask = (id: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  const addTask = (title: string, todolistId: string) => {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];

    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  const changeFilter = (value: FilterValueType, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setToDoLists([...todolists])
    }

  }

  const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {

    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId)

    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }


  }



  let [todolists, setToDoLists] = useState<Array<ToDolistType>>([
    { id: toDoListId1, title: 'What to learn?', filter: 'all' },
    { id: toDoListId2, title: 'What to buy?', filter: 'all' },
  ]);


  let removeTodolist = (todolistId: string) => {
    let filtredTodolists = todolists.filter((tl) => tl.id !== todolistId);
    setToDoLists(filtredTodolists);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  function addTodoList(title: string) {
    let todolist: ToDolistType = {
      id: v1(),
      filter: 'all',
      title: title,
    }
    setToDoLists([todolist, ...todolists]);

    setTasks({ ...tasksObj, [todolist.id]: [] })
  }
  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />


      {
        todolists.map((tl) => {
          let tasksForTodoList = tasksObj[tl.id];

          if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
          }
          if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
          }
          return (
            <Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodoList}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={tl.filter}
              removeTodoList={removeTodolist}
            />
          )
        })
      }




    </div>
  );
}



export default App;

