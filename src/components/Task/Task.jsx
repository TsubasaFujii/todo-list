import React from "react";
import styles from "./Task.module.css";
import removeButton from "../../assets/rubbish-bin-icon.svg";

export default function Task(props) {
    const { taskName, toggleCompletion, id, handleRemoveTask } = props;

    function toggleCheckbox() {
        toggleCompletion(id);
    }

    function handleClickRemove() {
        handleRemoveTask(id);
    }

    return (
        <li className={styles['task--list-item']}>
            <input
                type="checkbox"
                id={id}
                className={styles['task--checkbox']}
                name={taskName}
                onChange={toggleCheckbox}
            />
            <label
                htmlFor={id}
                className={styles['task--checkbox-label']}
            >
                {taskName}
            </label>
            <img
                src={removeButton}
                className={`icon ${styles['task--rubbish-bin']}`}
                onClick={handleClickRemove}
                alt="Remove"
            />
        </li>
    );
}
