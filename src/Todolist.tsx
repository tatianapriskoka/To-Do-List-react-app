import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todolistId: string) => void,
    changeFilter: (value: FilterValueType, todolistId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    filter: FilterValueType,
    removeTodoList: (todolistId: string) => void,
}

function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('');

    let [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('');
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            return props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        } else {
            setError('Field required')
        }

    }

    const onAllClickFilter = () => { props.changeFilter('all', props.id) };
    const onActiveClickFilter = () => { props.changeFilter('active', props.id) };
    const onCompletedClickFilter = () => { props.changeFilter('completed', props.id) };
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    };

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>X</button></h3>
            <div>
                <input value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ''}
                />
                <button onClick={addTask}>+</button>

                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((task) => {

                        const onRemoveHandler = () => {
                            props.removeTask(task.id, props.id)
                        }

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);

                        };
                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>{task.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickFilter}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickFilter}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickFilter}>Completed</button>
            </div>
        </div >
    )

}

export default Todolist;
