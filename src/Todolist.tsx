import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";
import AddItemForm from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";


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
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void,
    filter: FilterValueType,
    removeTodoList: (todolistId: string) => void,
    changeTodolistTitle: (id: string, newTitle: string) => void,
}

function Todolist(props: PropsType) {


    const onAllClickFilter = () => { props.changeFilter('all', props.id) };
    const onActiveClickFilter = () => { props.changeFilter('active', props.id) };
    const onCompletedClickFilter = () => { props.changeFilter('completed', props.id) };

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    };


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map((task) => {

                        const onRemoveHandler = () => {
                            props.removeTask(task.id, props.id)
                        }

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(task.id, newIsDoneValue, props.id);

                        };

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.id);

                        };
                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan title={task.title} onChange={onChangeTitleHandler} />

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
