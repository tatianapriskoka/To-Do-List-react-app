import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from './Todolist';

let task1 = [
  { id: 1, title: 'CSS', isDone: true },
  { id: 2, title: 'JS', isDone: true },
  { id: 3, title: 'React', isDone: false }
]

let task2 = [
  { id: 1, title: 'Terminator', isDone: true },
  { id: 2, title: 'XXX', isDone: true },
  { id: 3, title: 'Gentelmen', isDone: false }
]

function App() {

  return (
    <div className="App">
      <Todolist title='What to Learn?' tasks={task1} />
      <Todolist title='Movies' tasks={task2} />

    </div>
  );
}



export default App;
