import { ChangeEvent, useState, KeyboardEvent } from "react";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type AddItemFormType = {
    addItem: (title: string) => void,

}
function AddItemForm(props: AddItemFormType) {
    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addItem(newTaskTitle);
            setNewTaskTitle('');
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            return props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Field required')
        }

    }
    return (
        <div>
            <input value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ''}
            />
            <button onClick={addTask}>+</button>

            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default AddItemForm;