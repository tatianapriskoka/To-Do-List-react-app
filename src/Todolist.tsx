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
    changeTaskStatus: (taskId: string, isDone: boolean) => void,
    filter: FilterValueType,
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
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            return props.addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Field required')
        }

    }

    const onAllClickFilter = () => { props.changeFilter('all') };
    const onActiveClickFilter = () => { props.changeFilter('active') };
    const onCompletedClickFilter = () => { props.changeFilter('completed') };


    return (
        <div>
            <h3>{props.title}</h3>
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
                            props.removeTask(task.id)
                        }

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked);

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
