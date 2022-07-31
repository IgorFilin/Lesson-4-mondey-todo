import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    addCheckForTask: (id: string, isDone: boolean) => void
    filter:FilterValuesType
}

export function Todolist(props: PropsType) {
    let filter = props.filter

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() === "") {
          return setError('Title is required')
        }
        props.addTask(title.trim());
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'inputTask' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className='titleError'>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeHandlerCheck = (e: ChangeEvent<HTMLInputElement>) => {
                        props.addCheckForTask(t.id, e.currentTarget.checked)
                    }
                    return <li key={t.id} className={t.isDone === true ?'complitedTask':''}>
                        <input type="checkbox" onChange={onChangeHandlerCheck} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all'? 'activeFilter': ''} onClick={onAllClickHandler}>All</button>
            <button className={filter === 'active'? 'activeFilter': ''} onClick={onActiveClickHandler}>Active</button>
            <button className={filter === 'completed'? 'activeFilter': ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
