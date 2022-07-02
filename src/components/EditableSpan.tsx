import React, {useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [newTitle, setNewTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const editTask = () => {
        if (newTitle.trim() !== "") {
            props.callBack(newTitle)
        }
    }

    const changeEditHandler = () => {
        setEdit(!edit)
        editTask()
    }

    const onChangeHandler = (newTitle: string) => {
        setNewTitle(newTitle)
    }

    return (
        edit
            ? <input autoFocus onBlur={changeEditHandler}
                     onChange={(e) => onChangeHandler(e.currentTarget.value)} value={newTitle} type="text"/>
            : <span onDoubleClick={changeEditHandler}>{props.title}</span>
    )
}