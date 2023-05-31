import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValueType) => void,
    addTask: (title: string) => void,

}

function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onAllClickFilter = () => { props.changeFilter('all') };
    const onActiveClickFilter = () => { props.changeFilter('active') };
    const onCompletedClickFilter = () => { props.changeFilter('completed') };
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {

                        const onRemoveHandler = () => {
                            props.removeTask(task.id)
                        }
                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button onClick={onAllClickFilter}>All</button>
                <button onClick={onActiveClickFilter}>Active</button>
                <button onClick={onCompletedClickFilter}>Completed</button>
            </div>
        </div>
    )

}

export default Todolist;
