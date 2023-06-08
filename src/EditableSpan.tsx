import React, { ChangeEvent, useState } from "react";

export type EditableSpanPropsType = {
    title: string,
    onChange: (newValue: string) => void

}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(true);
    let [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value) }

    return (
        editMode ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
            : <span onDoubleClick={activateEditMode}> {props.title} </span>
    )
}